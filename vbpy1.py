import os
import webapp2
import jinja2
import time
#using Google.GData.Client;
#using Google.GData.Spreadsheets;

from google.appengine.ext import db

template_dir = os.path.join(os.path.dirname(__file__), 'html_code')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir), autoescape = True)

class Handler(webapp2.RequestHandler):
	def write(self, *a, **kw):
		self.response.out.write(*a, **kw)

	def render_str(self, templ, **params):
		t = jinja_env.get_template(templ)
		return t.render(params)
	
	def render(self, templ, **kw):
		self.write(self.render_str(templ, **kw))

class vbLeagues_db(db.Model):
	timestamp = db.StringProperty(required = False)
	league = db.StringProperty(required = True)
	teamName = db.StringProperty(required = True)
	created = db.DateTimeProperty(auto_now_add = True)


class MainPage(Handler):
	def get(self):
		self.rndr_front('vb')

	def rndr_front(self,hfile='blog_list.html', u='', c='', error='', L=6):
		myQry = 'SELECT * From vbLeagues_db ORDER BY created desc LIMIT ' + str(L)
		blg = db.GqlQuery(myQry)
		#print myQry
		self.render(hfile+'.html', user=u, cont=c, err=error, blog_qry=blg)
	
	def post(self):
		u = self.request.get('user')
		c = self.request.get('content')
	
		if u and c:
			a = vbLeagues_db(user = u, cont = c)
			a.put()
			time.sleep(.1)
			self.rndr_front(u='',c='', error='')
#		 self.redirect('/')

		else:
			err_msg = 'We need both a username and some content!'
			self.rndr_front(u=u, c=c, error=err_msg)

#class timeout(MainPage):
##    tout=self.request.get(self.id)
#  def get(self):
#    btn = self.request.get('v1')
#    sekf,response.headers['Content-Type'] = 'text/plain'
#    self.response.out.write(self.request)
#    
#class getTeamPy(MainPage):
#	def get(self):
#		self.rndr_front(hfile='getTeam')
#
#	def post(self):
#		a = Blog(user=self.request.get('user'),
#		    cont=self.request.get('content'))
#		a.put()
#		time.sleep(.1)
#		self.redirect('/blog_added')
#
class initDataPy(MainPage):
	def get(self):
    
		self.rnder_front(hfile='initData.html')


app = webapp2.WSGIApplication([('/', MainPage),
#                    ('/getTeam', getTeamPy),
                    ('/initData', initDataPy),
										], debug = True)

