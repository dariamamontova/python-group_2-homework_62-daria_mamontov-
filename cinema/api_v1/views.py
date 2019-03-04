from webapp.models import Movie, Category, Hall
from rest_framework import viewsets
from api_v1.serializers import MovieSerializer, CategorySerializer, HallSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer

class HallViewSet(viewsets.ModelViewSet):
    queryset = Hall.objects.all().order_by('name')
    serializer_class = HallSerializer