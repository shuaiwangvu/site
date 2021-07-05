from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('blog/', views.blog, name='blog'),
    path('publication/', views.publication, name='publication'),
    path('tools', views.tools, name='tools'),
    path('resume', views.resume, name='resume'),
    path('teaching', views.teaching, name='teaching'),
    path('activities', views.activities, name='activities'),
    path('data', views.data, name='data'),
]
