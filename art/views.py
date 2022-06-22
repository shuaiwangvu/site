
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
	template = loader.get_template('art/golden.html')
	context = {}
	return HttpResponse(template.render(context, request))

def gallery(request):
	template = loader.get_template('art/gallery.html')
	context = {}
	return HttpResponse(template.render(context, request))

def film(request):
	template = loader.get_template('art/film.html')
	context = {}
	return HttpResponse(template.render(context, request))
