


/** require object and method -- foxtrot.init */
window.foxtrot=window.foxtrot||{
  version:'1.0.0',
  uri:'https://github.com/9r3i/foxtrot-theme',
  init:function(){
    ForceWebsite.slideHeadLoader(1,100);
    var files=[
      "oldweb.js",
    ];
    ForceWebsite.theme.loadFiles(files,true);
    setTimeout(e=>{
      ForceWebsite.theme.putHTML(ForceWebsite.theme.content);
    },(100*files.length)+500);
  },
  foot:function(){
    var id='foxtrot-foot-loader',
    con=foxtrot.loader(id);
    ForceWebsite.fetch('website.select',function(r){
      if(!Array.isArray(r)){
        ForceObject.splash('Error: Failed to fetch data.');
        return;
      }
      var col=document.getElementById(id),
      url=ForceWebsite.imageURL(ForceWebsite.theme.config.data.foot),
      img='<img src="'+url+'" />\n\n';
      col.parentElement.innerHTML=atob(r[0].content);
    },{id:ForceWebsite.theme.config.data.foot});
    return con;
  },
  load:function(query,post,bulk){
    var ow=new OldWeb,
    id='page-loader',
    body=document.getElementById('body');
    if(query.hasOwnProperty('p')){
      var pcon=ow.pageContent(post);
      if(pcon){return pcon.outerHTML;}
      return 'Not Found...';
    }
    var pcon=ow.bulkContent(bulk);
    if(pcon){
      setTimeout(e=>{
        foxtrot.more('bulk-button-more');
      },50);
      return pcon.outerHTML;
    }return 'Nothing...';
  },
  loader:function(id){
    return '<div class="page-content-loader" id="'+id+'">'
      +'<img src="'
      +ForceWebsite.theme.path+'images/default.loader.gif'
      +'" /> Loading...'
      +'</div>';
  },
  more:function(id){
    var butMore=document.getElementById(id);
    if(!butMore){return;}
    butMore.addEventListener('click',function(e){
      var rowCount=parseInt(this.dataset.count),
      rowTotal=parseInt(this.dataset.total),
      rowLimit=foxtrot.data.limit+rowCount;
      for(var i=0;i<foxtrot.data.limit;i++){
        rowCount++;
        var be=document.getElementById('bulk-each-'+rowCount);
        if(be){
          be.classList.remove('bulk-hide');
        }
      }
      if(rowCount>=rowTotal){
        var tp=this.parentElement;
        tp.parentElement.removeChild(tp);
        return;
      }
      this.dataset.count=rowCount+'';
    },false);
  },
};


