#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
from google.appengine.ext import ndb
import json

class Learna(ndb.Model):
    text = ndb.TextProperty()

class SaveHandler(webapp2.RequestHandler):
    def post(self):
        json_obj = json.loads(self.request.body)

        new_learna = Learna(
            text=json_obj["code"])

        learna_key = new_learna.put()

        url_string = learna_key.urlsafe()

        obj = {'url': url_string, 'code': json_obj["code"]}

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(json.dumps(obj))


class GetHandler(webapp2.RequestHandler):
    def get(self, url_string):
        learna_key = ndb.Key(urlsafe=url_string)
        learna = learna_key.get()

        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(learna.text)

app = webapp2.WSGIApplication([
    ('/save', SaveHandler),
    (r'/get/(.+)', GetHandler)
], debug=True)
