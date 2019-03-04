from webapp.models import Movie, Category
from rest_framework import viewsets
from api_v1.serializers import MovieSerializer, CategorySerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer