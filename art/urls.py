from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('golden/', views.golden, name='golden'),
    path('hands/', views.hands, name='hands'),
    path('gallery/', views.gallery, name='gallery'),
    path('film/', views.film, name='film'),
    path('film2/', views.film2, name='film2'),
    path('seeing/', views.seeing, name='seeing'),
    path('design/', views.design, name='design'),
    path('lust/', views.lust, name='lust')
]
