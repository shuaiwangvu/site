
from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import RequestContext

def index(request):
    template = loader.get_template('art/home_page.html')
    context = {}
    return HttpResponse(template.render(context, request))

def hands(request):
    template = loader.get_template('art/hands.html')
    context = {}
    return HttpResponse(template.render(context, request))

def golden(request):
    return HttpResponse("This is your golden.")

def gallery(request):
    return HttpResponse("This is your gallery.")
