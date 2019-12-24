const AMOUNT = 1000;
$(function () {
    //$('cloud').attr('width',document.body.offsetWidth);
    //$('cloud').attr('height',document.body.offsetHeight);
    $("#cloud-result").hide();
    let color = ['rgb(207,0,162)', 'rgb(42,222,222)', 'white'];
    function generateTag() {
        let tags = $('#tags');
        for (let i = 0; i < AMOUNT; i++) {
            let tag = $(`<a href="#" id="${i}" class="tag">${i}</div>`)
            tag.css('color', color[i % 3]);
            tags.append(tag);
        }
    }
    generateTag();
    TagCanvas.Start('cloud', 'tags', {
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05,
        textHeight: 25,
        textColour: null,
        textFont: 'Impact,"Arial Black",sans-serif',
        noMouse: true,
        noSelect: true,
        initial: [-0.002, 0.0001],
        maxSpeed: 1,
        zoom: 1,
        interval: 40,
        centreImage: 'img/logo.svg',
    });
    TagCanvas.Start('cloud-result', 'tags', {
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05,
        textHeight: 25,
        textColour: null,
        textFont: 'Impact,"Arial Black",sans-serif',
        noMouse: true,
        noSelect: true,
        initial: [0, 0],
        maxSpeed: 1,
        zoom: 1,
        centreImage: 'img/logo.svg',
        animTiming: 'Linear'
    });
    let result = 0;
    function fadeIn() {
        $("#text").text(result);
        $(".result").animate({ opacity: 1 }, 300);
        $(".result").toggleClass("zoom-in", true);
    }
    function fadeOut(callback) {
        $(".result").toggleClass("zoom-in", false);
        $(".result").animate({ opacity: 0 }, 300, callback);
    }
    function random() {
        result = Math.round(Math.random() * AMOUNT);
        TagCanvas.TagToFront('cloud-result', { id: '' + result })
    }
    function speedUp() {
        let i = 0;
        let timer = setInterval(() => {
            if (i < 0.05) {
                i += 0.005;
                TagCanvas.SetSpeed('cloud', [-i, i * 0.5]);
            } else {
                console.log('speedUp done')
                clearInterval(timer);
            }
        }, 100)
    }

    function stop() {
        $("#cloud").hide();
        $("#cloud-result").show();
        TagCanvas.SetSpeed('cloud', [-0.002, 0.0001]);
        TagCanvas.TagToFront('cloud', { id: '' + result });
        setTimeout(()=>{
            fadeIn();
        }, 300);

    }

    function resume() {
        fadeOut(() => {
            $("#cloud").show();
            $("#cloud-result").hide();
            TagCanvas.SetSpeed('cloud', [-0.002, 0.0001]);
        });
    }

    $(document).keydown(function (event) {
        //alert(event.keyCode);
        if (event.keyCode === 38) {
            // 按向上键加速
            random();
            speedUp();
        }
        if (event.keyCode === 16) {
            // 按shift键恢复
            resume();
        }
        if (event.keyCode === 13) {
            stop();
        }
    });
})