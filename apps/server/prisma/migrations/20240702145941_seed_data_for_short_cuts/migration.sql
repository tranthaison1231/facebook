-- INSERT data for group
INSERT INTO "groups" ("id","name","userId","type", "avatar")
VALUES
  ('cly4j9nmr000108l72bh2bi2y','NestJS Viet Nam','clx1tm86b0000zwmwhumpz3a8','PUBLIC','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWlM5NYH9egY-VXphzd985NXDn-iuNEoHObA&s'),
  ('cly4ja617000208l757vzbkqv','Devscript','clx1tm86b0000zwmwhumpz3a8','PRIVATE','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrdUoIjZppJIYq7InQ5w52tPFzaiMs4TXxLA&s'),
  ('cly4jaayh000308l77btpgxla','Tradecoin Viet Nam','clx1tm86b0000zwmwhumpz3a8','PUBLIC','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6GDc2Zz0TcwiOsMjFQgXi34XGJsU7h89Ig&s'),
  ('cly4jaell000408l715g9gctg','Son Tung MTP','clx1tm86b0000zwmwhumpz3a8','PUBLIC', 'https://yt3.googleusercontent.com/oN0p3-PD3HUzn2KbMm4fVhvRrKtJhodGlwocI184BBSpybcQIphSeh3Z0i7WBgTq7e12yKxb=s900-c-k-c0x00ffffff-no-rj');

-- INSERT data for shortcuts table
INSERT INTO "short_cuts" ("id","groupId","userId")
VALUES
  ('clx2tl9uu0000kee8yu3tevw8','cly4j9nmr000108l72bh2bi2y','clx1tm86b0000zwmwhumpz3a8'),
  ('clx2tm5mg000018qaamya0bij','cly4ja617000208l757vzbkqv','clx1tm86b0000zwmwhumpz3a8'),
  ('clx2tm86b0000zwmwhumpz3a7','cly4jaayh000308l77btpgxla','clx1tm86b0000zwmwhumpz3a8');

