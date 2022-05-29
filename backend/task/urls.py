from django.urls import path
from task import views

urlpatterns = [
    path('contact/<int:pk>/', views.contact_tasks),
    path('task/<int:pk>/', views.specific_task)
]