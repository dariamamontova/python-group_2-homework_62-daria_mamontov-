from webapp.models import Movie, Category, Hall, Seat, Show, Discount, Ticket, Booking
from rest_framework import viewsets
from api_v1.serializers import MovieSerializer, CategorySerializer, HallSerializer, SeatSerializer, \
    ShowSerializer, DiscountSerializer, TicketSerializer, BookingSerializer, UserCreateSerializer, UserEditSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

class LoginView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'is_admin': user.is_superuser,
            'is_staff': user.is_staff,
            'id': user.id
        })

class BaseViewSet(viewsets.ModelViewSet):

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.request.method in ["POST", "DELETE", "PUT", "PATCH"]:
            permissions.append(IsAuthenticated())
            permissions.append(IsAdminUser())
        return permissions


class MovieViewSet(BaseViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()

class CategoryViewSet(BaseViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer

class HallViewSet(BaseViewSet):
    queryset = Hall.objects.all().order_by('name')
    serializer_class = HallSerializer

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()

class SeatViewSet(BaseViewSet):
    queryset = Seat.objects.all().order_by('seat')
    serializer_class = SeatSerializer

class ShowViewSet(BaseViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer

    def get_queryset(self):
        queryset = self.queryset
        movie_id = self.request.query_params.get('movie_id', None)
        hall_id = self.request.query_params.get('hall_id', None)
        starts_after = self.request.query_params.get('starts_after', None)
        starts_before = self.request.query_params.get('starts_before', None)

        if movie_id:
            queryset = queryset.filter(movie_id=movie_id)
        if hall_id:
            queryset = queryset.filter(hall_id=hall_id)
        if starts_after:
            queryset = queryset.filter(start_date__gte=starts_after)
        if starts_before:
            queryset = queryset.filter(start_date__lte=starts_before)
        return queryset

class DiscountViewSet(BaseViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer

class TicketViewSet(BaseViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class BookingViewSet(BaseViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class UserCreateView(CreateAPIView):
    model = User
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

class UserViewSet(BaseViewSet):
    queryset = User.objects.all()
    serializer_class = UserEditSerializer

    def get_permissions(self):
        permissions = super().get_permissions()
        if self.request.method in ["POST", "DELETE", "PUT", "PATCH"]:
            permissions.append(IsAuthenticated())
        return permissions
