
from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.shortcuts import redirect
from django.template import RequestContext

def index(request):
    template = loader.get_template('research/index.html')
    context = {}
    return HttpResponse(template.render(context, request))

def blog(request):
    return HttpResponse("This is your blog.")

def resume(request):
    template = loader.get_template('research/resume.html')
    context = {}
    return HttpResponse(template.render(context, request))

def publication(request):
    template = loader.get_template('research/publication.html')
    context = {}
    return HttpResponse(template.render(context, request))


def tools(request):
    # return HttpResponse("This is the source code of your tools and platforms.")
	template = loader.get_template('research/tools.html')
	context = {}
	return HttpResponse(template.render(context, request))

def data(request):
    template = loader.get_template('research/data.html')
    context = {}
    return HttpResponse(template.render(context, request))


def teaching(request):
    # return HttpResponse("This is your teaching.")
	template = loader.get_template('research/teaching.html')
	context = {}
	return HttpResponse(template.render(context, request))

def activities(request):
    return HttpResponse("This is your activities.")
