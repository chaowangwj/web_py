#coding=utf-8
import web
import datetime
import json

urls = (
	'/' , 'intex_test',
	'/index.html' , 'intex_test',
	'/register.html' , 'Register',
	'/login.html' , 'login',
	'/usermessage' , 'verif' ,
)


render = web.template.render('templates')

web.template.Template.globals['render'] = render
class verif(object):
	def GET(self):
		print '收到局部刷新数据'
		i=web.input()
		name=i.get('name')
		s=collection_user.find_one({'name':name})

		if s:
			return json.dumps({'find':True})
		else:
			return json.dumps({'find':False})

class intex_test(object):
	def GET(self):
		# i=web.input()
		# print i
		return render.index('')

class login(object):
	user_name_load=''
	def GET(self):
		return render.login('')

	def POST(self):
	
		i=web.input()
		print i
		if i :
			login.user_name_load=i.get('username')
			password=i.get('password')
			s=collection_user.find_one({'name':login.user_name_load,'password':password})
			if s:
				print '转到index页面'
				return render.index({
				"code":1,
				"userinfo":{
					"name":login.user_name_load
				}
							})
			else:
				print '密码不正确回到login页面'
				return render.login('')
		else:
			# print user_name_load , '...............'
			return json.dumps({
				"code":1,
				"userinfo":{
					"name":login.user_name_load
				}
							})



class Register(object):
	def GET(self):
		print '-----------'
		# Request Method:GET
		# return web.header('Request-Method', 'POST')
		return render.register('')
	def POST(self):
		i=web.input()
		# print i
		user_name=i.get('user_name',None)
		password=i.get('password',None)
		email=i.get('email',None)
		# password=i.get('password',None)
		s=collection_user.find_one({'name':user_name})
		print s
		if not s:
			user_message={
			'name':user_name,
			'password':password,
			'email':email,
			'time':datetime.datetime.now()
			}

			collection_user.insert_one(user_message)
			# print user_message
			return render.login('')
		else:
			return render.register('')


from pymongo import MongoClient

# Making a Connection with MongoClient
client = MongoClient('localhost', 27017)
# Getting a Database
db = client['todo-db']
# Getting a Collection

collection_user=db['user']

if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()