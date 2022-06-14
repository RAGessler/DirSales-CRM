from django.urls import path, include
from contact import views

urlpatterns = [
    path('', views.user_contacts),
    path('<int:pk>/', views.contact_detail)
]