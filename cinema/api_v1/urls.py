from django.urls import include, path
from rest_framework import routers
from api_v1 import views


router = routers.DefaultRouter()
router.register(r'movies', views.MovieViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'halls', views.HallViewSet)
router.register(r'seats', views.SeatViewSet)
router.register(r'shows', views.ShowViewSet)
router.register(r'discount', views.DiscountViewSet)
router.register(r'ticket', views.TicketViewSet)
router.register(r'booking', views.BookingViewSet)
router.register(r'users', views.UserViewSet)


app_name = 'api_v1'

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginView.as_view(), name='api_token_auth'),
    path('register/', views.UserCreateView.as_view(), name='register'),
    path('token-login/', views.TokenLoginView.as_view(), name='api_token_re_login'),
]
