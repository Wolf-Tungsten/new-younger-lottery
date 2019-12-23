const AMOUNT = 1000;
$(function() {
    //$('cloud').attr('width',document.body.offsetWidth);
    //$('cloud').attr('height',document.body.offsetHeight);
    $("#cloud-result").hide();  
    let color = ['rgb(207,0,162)', 'rgb(42,222,222)', 'white'];
    function generateTag() {
        let tags = $('#tags');
        for(let i = 0; i < AMOUNT; i++){
            let tag = $(`<a href="#" id="${i}" class="tag">${i}</div>`)
            tag.css('color',color[i % 3]);
            tags.append(tag);
        }
    }
    generateTag();
    TagCanvas.Start('cloud', 'tags', {
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05,
        textHeight: 20,
        textColour: null,
        textFont:'Impact,"Arial Black",sans-serif',
        noMouse: true,
        noSelect: true,
        initial:[-0.002, 0.0001],
        maxSpeed: 1,
        zoom:  0.9,
        interval: 40,
        centreImage: 'img/logo.svg', 
      });
      TagCanvas.Start('cloud-result', 'tags', {
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05,
        textHeight: 20,
        textColour: null,
        textFont:'Impact,"Arial Black",sans-serif',
        noMouse: true,
        noSelect: true,
        initial:[0, 0],
        maxSpeed: 1,
        zoom:  0.9,
        centreImage: 'img/logo.svg',
        animTiming: 'Linear' 
      });

    function speedUp(){
        let i = 0;
        let timer = setInterval(()=>{
            if (i < 0.05) {
                i += 0.005;
                TagCanvas.SetSpeed('cloud', [-i, i*0.5]);
            } else {
                console.log('speedUp done')
                clearInterval(timer);
            }
        }, 100)
    }
    let current = 0;
    function stop() {
        
        if(current){
            TagCanvas.Resume('cloud');
            TagCanvas.SetSpeed('cloud', [-0.002, 0.0001]);
            $("#cloud").show();
            $("#cloud-result").hide();      
        } else {
            TagCanvas.TagToFront('cloud-result', {id: "114"});
            TagCanvas.TagToFront('cloud', {id: "114"});
            $("#cloud").hide();
            $("#cloud-result").show();
        }
        current = !current;
        //TagCanvas.TagToFront('cloud', {id: "114"});
        //TagCanvas.TagToFront('cloud', {id: "114"});
    }
    function zoomIn(){

    }
    $(document).keydown(function (event) {
        //alert(event.keyCode);
        if(event.keyCode === 38) {
            // 按向上键加速
            speedUp();
        }
        if(event.keyCode === 13){
            stop();
        }
    });
})