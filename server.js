const http = require("http")
const querystring = require('querystring')
const url = require("url")
const fs = require('fs')

let users = []
let server = http.createServer((req, res) => {
  let str = ''
  let {pathname} = url.parse(req.url, true)
  req.on('data', data => {
    str += data
  })
  req.on('end', () => {
    //转成对象之后把username, pw, value取出来
    let rqData = querystring.parse(str)
    let {username, pw, value} = rqData;

    switch (pathname) {
      case '/reg'://注册
        //开始校验用户名和密码
        if (!username) {
          res.write('{"err": 1, "msg": "username is necessary"}')
        } else if (!pw) {
          res.write('{"err": 1, "msg": "password is necessary"}')
        } else if (users[username]) {
          res.write('{"err": 1, "msg": "username is existed"}')
        } else {
          //没问题了，存起来
          users[username] = pw;
          console.log('注册成功')
          res.write('{"err": 0, "msg": "reg done"}')
        }
        res.end()//注意位置，res.end只能在write之类的后面
        break;

      case '/login'://登录
        if (!username) {
          res.write('{"err": 1, "msg": "username is necessary"}')
        } else if (!pw) {
          res.write('{"err": 1, "msg": "password is necessary"}')
        } else if (!users[username]) {
          res.write('{"err": 1, "msg": "username is not existed"}')
        } else if (!users[username] == pw) {
          res.write('{"err": 1, "msg": "password is wrong"}')
        } else {
          console.log('登录成功')
          // res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.write(`{"err": 0, "msg": "ok","username":${username}}`)
        };
        res.end()

        break;

      case '/addTalk':
//添加到json文件，只能先读出来加上去再重新写入

        fs.readFile('./src/talks.json', function (err, data) {
          if (err) {
            return console.error(err);
          }
          let old = JSON.parse(data.toString());//将字符串转换为json对象
          let obj = {}
          obj["name"] = username
          obj["comment"] = value
          old.talks.push(obj);//将新对象加进去
          let strNew = JSON.stringify(old);
          fs.writeFile('./src/talks.json', strNew, function (err) {
            if (err) {
              console.error(err);
            }
            console.log('评论添加成功！！！！！！！');
            res.write('{"err": 0, "msg": "add success"}')
            //记得加上end！
            res.end()
          })

        })


        break;

      default: //其他资源请求(都是get)
          if (req.url !== '/') {
            //非主页
            fs.readFile(`src${req.url}`, (err, data) => {
              if (err) {
                console.log(err)
              } else {
                console.log('ok')
                res.write(data)
              }
              res.end()
            })
          } else {
            //req.url为'/'，即为主页
            fs.readFile('index.html', (err, data) => {
              if (err) {
                console.log(err)
              } else {
                console.log('ok')
                res.write(data)
              }
              res.end()
            })
          }



    }


  })

})


server.listen(8080)
