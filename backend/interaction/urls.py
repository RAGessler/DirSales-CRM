from django.urls import path, include
from interaction import views

urlpatterns = [
    path('contact/<int:pk>/', views.contact_interactions),
    path('interaction/<int:pk>/', views.specific_interactions)
]