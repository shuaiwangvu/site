from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('publication/', views.publication, name='publication'),
    path('data', views.data, name='data'),
    path('tools', views.tools, name='tools'),
    path('blog/', views.blog, name='blog'),
    path('teaching', views.teaching, name='teaching'),
    path('activities', views.activities, name='activities')
]
