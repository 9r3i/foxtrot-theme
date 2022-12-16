/**
 * OldWeb
 * ~ old fucking website method
 * started at december 16th 2022
 * @require: ForceWebsite
 */
function OldWeb(){
this.version='1.1.0';
this.config=ForceWebsite.config;
const ForceObject=ForceWebsite.Force;
/* cloned methods from ForceObject */
this.buildElement=ForceObject.buildElement;
this.clearElement=ForceObject.clearElement;
this.parseQuery=ForceObject.parseQuery;
/* bulk content */
this.bulkContent=function(d){
  var bulk=this.buildElement('div',null,{
    'class':'bulk',
  }),
  rowCount=0,tmpCount=0;
  for(var i in d){
    if(d[i].type!='text'){
      continue;
    }
    rowCount++;
    var p=d[i],
    img=new Image,
    beslug=this.buildElement('a',p.title,{
      href:'?p='+p.slug,
    }),
    bepicture=this.buildElement('div',null,{
      'class':'bulk-each-picture',
      'id':'picture-'+p.slug,
    }),
    betitle=this.buildElement('div',null,{
      'class':'bulk-each-title',
    },[beslug]),
    betime=this.buildElement('div',p.time,{
      'class':'bulk-each-time',
    }),
    be=this.buildElement('div',null,{
      'class':'bulk-each',
      'id':'bulk-each-'+rowCount,
      'data-id':p.id,
      'data-slug':p.slug,
    },[
      betitle,betime,bepicture,
    ]);
    be.appendTo(bulk);
    if(rowCount>ForceWebsite.theme.config.data.limit){
      be.classList.add('bulk-hide');
      tmpCount++;
    }
    /* image */
    img.src=ForceWebsite.imageURL(p.id);
    img.dataset.slug=p.slug;
    img.onload=function(e){
      var bepid='picture-'+this.dataset.slug;
      bep=document.getElementById(bepid);
      if(bep){
        bep.style.backgroundImage="url('"+this.src+"')";
      }
    };
  }
  if(rowCount<=ForceWebsite.theme.config.data.limit){
    return bulk;
  }
  /* load more data */
  var butMore=this.buildElement('button','More',{
    'class':'bulk-button',
    'data-count':ForceWebsite.theme.config.data.limit+'',
    'data-total':rowCount+'',
    'id':'bulk-button-more',
  }),
  be=this.buildElement('div',null,{
    'class':'bulk-each-down',
  },[butMore]);
  be.appendTo(bulk);
  return bulk;
};
/* page content */
this.pageContent=function(p){
  var ptitle=this.buildElement('div',p.title,{
    'class':'page-title',
    'id':'title',
  }),
  ploader=this.buildElement('div',null,{
    'class':'page-content-loader',
  },[
    this.buildElement('img',null,{
      'src':ForceWebsite.theme.path+'images/default.loader.gif',
    }),
    document.createTextNode('Loading...'),
  ]),
  img=new Image,
  ppicture=this.buildElement('div',null,{
    'class':'page-picture',
    'id':'page-picture-'+p.slug,
  }),
  pcontent=this.buildElement('div',null,{
    'class':'page-content',
    'id':'content',
    'data-id':p.id+'',
  },[ploader]),
  ptime=this.buildElement('div',p.time,{
    'class':'page-time'
  }),
  page=this.buildElement('div',null,{
    'class':'page',
  },[
    ptitle,ptime,ppicture,pcontent,
  ]);
  /* image */
  img.src=ForceWebsite.imageURL(p.id);
  img.dataset.slug=p.slug;
  img.onload=function(e){
    var ppid='page-picture-'+this.dataset.slug;
    pp=document.getElementById(ppid);
    if(pp){
      ForceWebsite.clearElement(pp);
      pp.appendChild(img);
    }
  };
  /* content */
  if(p.hasOwnProperty('content')){
    pcontent.innerHTML=p.content;
  }else{
    this.fetch('website.content',function(r){
      ForceWebsite.data[p.slug]['content']=r;
      pcontent.innerHTML=r;
    },{id:p.id});
  }
  return page;
};
}
