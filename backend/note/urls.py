from django.urls import path, include
from note import views

urlpatterns = [
    path('contact/<int:pk>/', views.contact_notes),
    path('note/<int:pk>/', views.specific_note)
]
