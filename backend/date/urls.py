from django.urls import path, include
from date import views

urlpatterns = [
    path('user', views.user_dates),
    path('contact/<int:pk>/', views.contact_dates),
    path('date/<int:pk>/', views.specific_dates)
]