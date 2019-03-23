from webapp.models import Movie, Category, Hall, Seat, Show, Discount, Ticket, Booking
from rest_framework import serializers
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:category-detail')

    class Meta:
        model = Category
        fields = ('url', 'id', 'name', 'description')

class InlineCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class MovieSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:movie-detail')
    categories = InlineCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ('url', 'id', 'name', 'description', 'poster', 'release_date', 'finish_date', 'categories')

class InlineSeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = ('id', 'row', 'seat')

class HallSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:hall-detail')
    seats = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Hall
        fields = ('url', 'id', 'name', 'seats')

class SeatSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:seat-detail')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', read_only=True, source='hall')

    class Meta:
        model = Seat
        fields = ('url', 'id', 'row', 'seat', 'hall', 'hall_url')

class ShowSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:show-detail')
    movie_url = serializers.HyperlinkedRelatedField(view_name='api_v1:movie-detail', read_only=True, source='movie')
    hall_url = serializers.HyperlinkedRelatedField(view_name='api_v1:hall-detail', read_only=True, source='hall')
    hall_name = serializers.SerializerMethodField(read_only=True, source='hall')
    movie_name = serializers.SerializerMethodField(read_only=True, source='movie')

    def get_hall_name(self, show):
        return show.hall.name

    def get_movie_name(self, show):
        return show.movie.name

    class Meta:
        model = Show
        fields = ('url', 'id', 'movie', 'movie_url', 'hall', 'hall_url', 'start_date', 'finish_date', 'price', 'hall_name', 'movie_name')

class DiscountSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:discount-detail')

    class Meta:
        model = Discount
        fields = ('url', 'id', 'name', 'discount_price', 'starts_at', 'finishes_at')

class TicketSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:ticket-detail')
    show_url = serializers.HyperlinkedRelatedField(view_name='api_v1:show-detail', read_only=True, source='show')
    seat_url = serializers.HyperlinkedRelatedField(view_name='api_v1:seat-detail', read_only=True, source='seat')
    discount_url = serializers.HyperlinkedRelatedField(view_name='api_v1:discount-detail', read_only=True, source='discount')

    class Meta:
        model = Ticket
        fields = ('url', 'id', 'show_url', 'show', 'seat_url', 'seat', 'discount_url', 'discount', 'returned')

class BookingSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:booking-detail')
    show_url = serializers.HyperlinkedRelatedField(view_name='api_v1:show-detail', read_only=True, source='show')
    seats = InlineSeatSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = ('url', 'id', 'show_url', 'show', 'seats', 'status', 'created_at', 'updated_at')

class UserSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:user-detail')
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'url']