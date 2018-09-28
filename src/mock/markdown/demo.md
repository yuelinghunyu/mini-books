## 一、场景与环境
1、我是名小白web工作者，每天都为自己的将来担心不已。第一次记录日常开发中的过程，如有表达不当，还请一笑而过；  
2、本实例开发环境前端采用 angular框架，后端采用 springboot框架；  
3、实现的目的如下：  
&emsp;&emsp;a、前端实现登录操作（无注册功能）；  
&emsp;&emsp;b、后端接收到登录信息，生成有效期限token（后端算法生成的一段秘钥），作为结果返回给前端；  
&emsp;&emsp;c、前端在此后的每次请求，都会携带token与后端校验；  
&emsp;&emsp;d、在token有效时间内前端的请求响应都会成功，后端实时的更新token有效时间（暂无实现），如果token失效则返回登录页。
## 二、后端实现逻辑  
<em><b>注：部分代码参考网上各个大神的资料</em></b>   
整个服务端项目结构如下(登录token拦截只是在此工程下的一部分，文章结尾会贴上工程地址)：  
![](https://user-gold-cdn.xitu.io/2018/9/3/1659cf97e37fd111?w=432&h=592&f=png&s=17163)
### 1、新增AccessToken 类 model 
&emsp;&emsp;在model文件下新增AccessToken.java，此model 类保存校验token的信息：
```
/**
 * @param access_token token字段;
 * @param token_type token类型字段;
 * @param expires_in token 有效期字段;
 */
public class AccessToken {
    private String access_token;
    private String token_type;
    private long expires_in;

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getToken_type() {
        return token_type;
    }

    public void setToken_type(String token_type) {
        this.token_type = token_type;
    }

    public long getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(long expires_in) {
        this.expires_in = expires_in;
    }
}
```
### 2、新增Audience 类 model
```
@ConfigurationProperties(prefix = "audience")
public class Audience {
    private String clientId;
    private String base64Secret;
    private String name;
    private int expiresSecond;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getBase64Secret() {
        return base64Secret;
    }

    public void setBase64Secret(String base64Secret) {
        this.base64Secret = base64Secret;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getExpiresSecond() {
        return expiresSecond;
    }

    public void setExpiresSecond(int expiresSecond) {
        this.expiresSecond = expiresSecond;
    }
}
```
@ConfigurationProperties(prefix = "audience")获取配置文件的信息（application.properties），如下：  
```
server.port=8888
spring.profiles.active=dev
server.servlet.context-path=/movies

audience.clientId=098f6bcd4621d373cade4e832627b4f6
audience.base64Secret=MDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjY=
audience.name=xxx
audience.expiresSecond=1800
```
配置文件定义了端口号、根路径和audience相关字段的信息，（audience也是根据网上资料命名的），audience的功能主要在第一次登录时，生成有效token，然后将token的信息存入上述AccessToken类model中，方便登录成功后校验前端携带的token信息是否正确。
### 3、生成以jwt包的CreateTokenUtils 工具类
&emsp;&emsp;下面对这个工具类的生成、功能进行说明：  
&emsp;&emsp;a、首先在pom.xml文件中引用依赖（这和前端在package.json安装npm包性质相似）
```
    <dependency>
       <groupId>io.jsonwebtoken</groupId>
       <artifactId>jjwt</artifactId>
       <version>0.6.0</version>
    </dependency>
```
&emsp;&emsp;b、然后再uitls文件夹下新增工具类CreateTokenUtils，代码如下 ：  
```
public class CreateTokenUtils {
    private static Logger logger = LoggerFactory.getLogger(CreateTokenUtils.class);

    /**
     *
     * @param request
     * @return s;
     * @throws Exception
     */
    public static ReturnModel checkJWT(HttpServletRequest request,String base64Secret)throws Exception{
        Boolean b = null;
        String auth = request.getHeader("Authorization");
        if((auth != null) && (auth.length() > 4)){
            String HeadStr = auth.substring(0,3).toLowerCase();
            if(HeadStr.compareTo("mso") == 0){
                auth = auth.substring(4,auth.length());
                logger.info("claims:"+parseJWT(auth,base64Secret));
                Claims claims = parseJWT(auth,base64Secret);
                b = claims==null?false:true;
            }
        }
        if(b == false){
            logger.error("getUserInfoByRequest:"+ auth);
            return new ReturnModel(-1,b);
        }
        return new ReturnModel(0,b);
    }

    public static Claims parseJWT(String jsonWebToken, String base64Security){
        try
        {
            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(base64Security))
                    .parseClaimsJws(jsonWebToken).getBody();
            return claims;
        }
        catch(Exception ex)
        {
            return null;
        }
    }
    public static String createJWT(String name,String audience, String issuer, long TTLMillis, String base64Security)
    {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(base64Security);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder().setHeaderParam("typ", "JWT")
                .claim("unique_name", name)
                .setIssuer(issuer)
                .setAudience(audience)
                .signWith(signatureAlgorithm, signingKey);
        if (TTLMillis >= 0) {
            long expMillis = nowMillis + TTLMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp).setNotBefore(now);
        }

        return builder.compact();
    }

}
```
此工具类有三个 静态方法：  
&emsp;checkJWT—— 此方法在后端拦截器中使用，检测前端发来的请求是否带有token值  
&emsp;createJWT——此方法在登陆接口中调用，首次登陆生成token值  
&emsp;parseJWT——此方法在checkJWT中调用，解析token值，将jwt类型的token值分解成audience模块  
&emsp;可以在parseJWT方法中打断点，查看Claims 对象，发现其字段存储的值与audience对象值一一对应。  
<em><b>注：Claims对象直接会将token的有效期进行判断是否过期，所以不需要再另写相关时间比对逻辑，前端的带来的时间与后台的配置文件audience的audience.expiresSecond=1800 Claims对象会直接解析</b></em>  
### 4、拦截器的实现HTTPBasicAuthorizeHandler类的实现
在typesHandlers文件夹中新建HTTPBasicAuthorizeHandler类，代码如下：
```
@WebFilter(filterName = "basicFilter",urlPatterns = "/*")
public class HTTPBasicAuthorizeHandler implements Filter {
    private static Logger logger = LoggerFactory.getLogger(HTTPBasicAuthorizeHandler.class);
    private static final Set<String> ALLOWED_PATHS = Collections.unmodifiableSet(new HashSet<>(Arrays.asList("/person/exsit")));
    @Autowired
    private Audience audience;
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        logger.info("filter is init");
    }
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        logger.info("filter is start");
        try {
            logger.info("audience:"+audience.getBase64Secret());
            HttpServletRequest request = (HttpServletRequest) servletRequest;
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            String path = request.getRequestURI().substring(request.getContextPath().length()).replaceAll("[/]+$", "");
            logger.info("url:"+path);
            Boolean allowedPath = ALLOWED_PATHS.contains(path);
            if(allowedPath){
                filterChain.doFilter(servletRequest,servletResponse);
            }else {
                ReturnModel returnModel = CreateTokenUtils.checkJWT((HttpServletRequest)servletRequest,audience.getBase64Secret());
                if(returnModel.getCode() == 0){
                    filterChain.doFilter(servletRequest,servletResponse);
                }else {
                    // response.setCharacterEncoding("UTF-8");
//                    response.setContentType("application/json; charset=utf-8");
//                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//                    ReturnModel rm = new ReturnModel();
//                    response.getWriter().print(rm);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    @Override
    public void destroy() {
        logger.info("filter is destroy");
    }
}
```
此类继承Filter类，所以重写的三个方法init、doFitler、destory，重点拦截的功能在doFitler方法中：  

&emsp;a、前端发来请求都会到这个方法，那么显而易见，第一登陆请求肯定不能拦截，因为它不带有token值，所以剔除登录拦截这种情况：  
```
private static final Set<String> ALLOWED_PATHS = Collections.unmodifiableSet(new HashSet<>(Arrays.asList("/person/exsit")));
```
这里面的我的登录接口路径是“/person/exsit”，所以在将前端请求路径分解：
```
String path = request.getRequestURI().substring(request.getContextPath().length()).replaceAll("[/]+$", "");
```
两者进行如下比对：
```
Boolean allowedPath = ALLOWED_PATHS.contains(path);
```
根据allowedPath 的值进行判断是否拦截；  
&emsp;b、拦截的时候调用上述工具类的checkJWT方法，判断token是否有效：  
```
ReturnModel returnModel = CreateTokenUtils.checkJWT((HttpServletRequest)servletRequest,audience.getBase64Secret());
```
ReturnModel 是我定义的返回类型结构，在model文件下；  
&emsp;c、如果token无效，处理代码注释了：  


![](https://user-gold-cdn.xitu.io/2018/9/3/1659d0ac99d195ca?w=901&h=159&f=png&s=12429)  

原因前端angular实现的拦截器和后端会冲突，导致前端代码异常，后面会详细说明。  
&emsp;d、配置拦截器有两种方法(这里只介绍一种)：

![](https://user-gold-cdn.xitu.io/2018/9/3/1659d0c2bf7dedf2?w=833&h=149&f=png&s=8750)  
直接在拦截类上添加注释的方法，urlPatterns是你过滤的路径，还需在服务启动的地方配置  

![](https://user-gold-cdn.xitu.io/2018/9/3/1659d0c76ec438d8?w=888&h=261&f=png&s=17023)  
<em><b>注：这里面过滤的路径不包括配置文件的根路径，比如说前端访问接口路径“/movies/people/exist”，这里面的movies是根路径，在配置文件中配置，如果你想拦截这个路径，则urlPatterns=”/people/exist“即可。</b></em>
### 5、登录类的实现
在controller文件夹中新建PersonController类，代码如下  
```
/**
 * Created by jdj on 2018/4/23.
 */
@RestController
@RequestMapping("/person")
public class PersonController {
    private final static Logger logger = LoggerFactory.getLogger(PersonController.class);
    @Autowired
    private PersonBll personBll;
    @Autowired
    private Audience audience;
    /**
     * @content:根据id对应的person
     * @param id=1;
     * @return returnModel
     */
    @RequestMapping(value = "/exsit",method = RequestMethod.POST)
    public ReturnModel exsit(
            @RequestParam(value = "userName") String userName,
            @RequestParam(value = "passWord") String passWord
    ){
        String md5PassWord = Md5Utils.getMD5(passWord);
        String id = personBll.getPersonExist(userName,md5PassWord);
        if(id == null||id.length()<0){
            return new ReturnModel(-1,null);
        }else {
            Map<String,Object> map = new HashMap<>();
            Person person = personBll.getPerson(id);
            map.put("person",person);
            String accessToken = CreateTokenUtils
                    .createJWT(userName,audience.getClientId(), audience.getName(),audience.getExpiresSecond() * 1000, audience.getBase64Secret());
            AccessToken accessTokenEntity = new AccessToken();
            accessTokenEntity.setAccess_token(accessToken);
            accessTokenEntity.setExpires_in(audience.getExpiresSecond());
            accessTokenEntity.setToken_type("bearer");
            map.put("accessToken",accessTokenEntity);
            return new ReturnModel(0,map);
        }
    }
    /**
     * @content:list
     * @param null;
     * @return returnModel
     */
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public ReturnModel list(){
        List<Person> list = personBll.selectAll();
        if(list.size()==0){
            return new ReturnModel(-1,null);
        }else {
            return new ReturnModel(0,list);
        }
    }

    @RequestMapping(value = "/item",method = RequestMethod.GET)
    public ReturnModel getItem(
            @RequestParam(value = "id") String id
    ){
        Person person = personBll.getPerson(id);
        if(person != null){
            return new ReturnModel(0,person);
        }else {
            return new ReturnModel(-1,"无此用户");
        }
    }
}
```
前端调用这个类的接口路径：“/movies/people/exist”  
首先它会查询数据库  
```
 String id = personBll.getPersonExist(userName,md5PassWord);
 ```
 如果查询存在，创建accessToken  
 ```
  String accessToken = CreateTokenUtils
   .createJWT(userName,audience.getClientId(), audience.getName(),audience.getExpiresSecond() * 1000, audience.getBase64Secret());
```
最后整合返回到前端model  
```
AccessToken accessTokenEntity = new AccessToken();
            accessTokenEntity.setAccess_token(accessToken);
            accessTokenEntity.setExpires_in(audience.getExpiresSecond());
            accessTokenEntity.setToken_type("bearer");
            map.put("accessToken",accessTokenEntity);
            return new ReturnModel(0,map);
```
这个controller类中还有两个接口供前端登陆成功后调用。  


以上都是服务端的实现逻辑，接下来说明前端的实现逻辑，我本身是前端小码农，后端只是大多是不会的，如有错误，请一笑而过哈~_~哈

## 三、前端实现逻辑
前端使用angular框架，目录如下  

![](https://user-gold-cdn.xitu.io/2018/9/3/1659d10edbded85d?w=547&h=781&f=png&s=37502)
上述app文件下common 存一些共同组建（分页、弹框）、component存一些整体布局框架、
page是各个页面组件，service是请求接口聚集地，shared是表单自定义校验；所以这里面都有相关的angular2+表单校验、http请求、分页、angular动画等各种实现逻辑。  
### 1、前端http请求（确切的说httpClient请求）  
所有的请求都在service文件夹service.service.ts文件中，代码如下：  
```
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class ServiceService {
  movies:string;
  httpOptions:Object;
  constructor(public http:HttpClient) {
    this.movies = "/movies";
    this.httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
      }),
    }
  }
  /**登录模块开始*/
  loginMovies(body){
    const url = this.movies+"/person/exsit";
    const param = 'userName='+body.userName+"&passWord="+body.password;
    return this.http.post(url,param,this.httpOptions);
  }
  /**登录模块结束*/
  //首页;
  getPersonItem(param){
    const url = this.movies+"/person/item";
    return this.http.get(url,{params:param});
  }
  //个人中心
  getPersonList(){
    const url =  this.movies+"/person/list";
    return this.http.get(url);
  /**首页模块结束 */
}
```
上述有三个请求与后端personController类中三个接口方法一一对应，这里面的请求方式官网有，这里不做赘述，this.httpOptions是设置请求头。然后再app.modules.ts中添加到provides，所谓的依赖注入，这样就可以在各个页面调用servcie方法了  
```
 providers: [ServiceService,httpInterceptorProviders]
 ```
 httpInterceptorProviders 是前端拦截器，前端每次请求结果都会出现成功或者错误，所以在拦截器中统一处理返回结果使代码更简洁。  
 ### 2、前端拦截器的实现
 在app文件在新建InterceptorService.ts文件，代码如下：  
 ```
 import { Injectable } from '@angular/core';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { mergeMap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor{
    constructor(
        private router:Router,
    ){ }
    authorization:string = "";
    authReq:any;
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        this.authorization = "mso " + localStorage.getItem("accessToken");
        
        if (req.url.indexOf('/person/exsit') === -1) {
            this.authReq = req.clone({
                url:req.url,
                headers:req.headers.set("Authorization",this.authorization)
            });
        }else{
            this.authReq = req.clone({
                url:req.url,
            });
        }
        return next.handle(this.authReq).pipe(mergeMap((event:any) => {
            if(event instanceof HttpResponse && event.body === null){
                return this.handleData(event);
            }
            return Observable.create(observer => observer.next(event));
        }));
    }
    private handleData(event: HttpResponse<any>): Observable<any> {
        // 业务处理：一些通用操作
        switch (event.status) {
          case 200:
            if (event instanceof HttpResponse) {
                const body: any = event.body;
                if (body === null) {
                    this.backForLoginOut();
                }
            }
            break;
          case 401: // 未登录状态码
            this.backForLoginOut();
            break;
          case 404:
          case 500:
          break;
          default:
          return ErrorObservable.create(event);
      }
    }
    private backForLoginOut(){
        if(localStorage.getItem("accessToken") !== null || localStorage.getItem("person")!== null){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("person");
        }
            if(localStorage.getItem("accessToken") === null && localStorage.getItem("person") === null){
            this.router.navigateByUrl('/login');
        }
    }
}
```
拦截器的实现官网也详细说明了，但是拦截器有几大坑：  
&emsp;&emsp;a、如果用的是angular2，你请求是采用的是import { Http } from "@angular/http"包http，那么拦截器无效，你可能需要另一种写法了，angular4、5、6都是采用import { HttpClient,HttpHeaders } from "@angular/common/http"包下HttpClient和请求头HttpHeaders ；  
&emsp;&emsp;b、拦截器返回结果的方法中：
```
return next.handle(this.authReq).pipe(mergeMap((event:any) => {
            if(event instanceof HttpResponse && event.body === null){
                return this.handleData(event);
            }
            return Observable.create(observer => observer.next(event));
        }));
```
打断点查看这个方法一次请求会循环两次，第一次event:{type:0},第二次才会返回对象，截图如下：
第一次  

![](https://user-gold-cdn.xitu.io/2018/9/3/1659d14c34a05f54?w=815&h=157&f=png&s=12090)
第二次

![](https://user-gold-cdn.xitu.io/2018/9/3/1659d150daddc22b?w=824&h=209&f=png&s=17358)
但是如果以我上述后端拦截器token无效的情况处理代码（就是我注释的那段代码，我注释的代码重点的作用是返回401,可以回看），这个逻辑只循环一次，所以我将后端代码返回token无效的代码注释，前端拦截器在后端代码注释的情况下第二次返回的event结果体存在event.body=== null,以这个条件进行token是否有效判断;  
&emsp;&emsp;c、拦截器使用rxjs，如果你在页面请求中使用rxjs中Observable.forkJoin()方法进行并发请求，那么不好意思，好像无效，如果你有办法解决这两个不冲突，请告诉我哈。  
&emsp;&emsp;d、这里面也要剔除登陆的拦截，具体看代码。
### 3、登录效果
以上的逻辑都是实现过程，下面来看下整体的效果：  
登陆逻辑中我用的是localStorage存储token值的：
![](https://user-gold-cdn.xitu.io/2018/9/3/1659d192662f5207?w=988&h=421&f=png&s=48148)
点击登录会先到前端拦截器，然后直接跳到else  
![](https://user-gold-cdn.xitu.io/2018/9/3/1659d1a77ce4b226?w=1768&h=853&f=png&s=567427)
![](https://user-gold-cdn.xitu.io/2018/9/3/1659d1a99104e54b?w=1763&h=843&f=png&s=589767)
接着到后端服务拦截器
![](https://user-gold-cdn.xitu.io/2018/9/3/1659d1ae7b435ad1?w=1838&h=780&f=png&s=110145)
过滤登陆接口，直接跳到登陆接口，创建token值并返回
![](https://user-gold-cdn.xitu.io/2018/9/3/1659d1b382b629e0?w=1800&h=517&f=png&s=84478)
观察返回的map值  
![](https://user-gold-cdn.xitu.io/2018/9/3/1659d1b879775ab0)
最后返回前端界面
![](https://user-gold-cdn.xitu.io/2018/9/3/1659d1cd0477ed68?w=1592&h=785&f=png&s=324095)
上面的返回结果与后端对应，登录成功后，再请求其他页面会携带token值
![](https://user-gold-cdn.xitu.io/2018/9/3/1659d1d1fd3d1ed3?w=1883&h=627&f=png&s=236925)


以上就是关于前后端分离登录校验，还有一步没有完成，就是token更新时间有效期，等抽时间再补充，上述代码后端用idea编辑器，后端服务搭建会涉及到很多配置。  
上面实现的代码github地址如下：https://github.com/yuelinghunyu/movies
麻烦各位给我点个赞，第一次写记录文档，我会坚持写下去，会坚信越来越好，谢谢。