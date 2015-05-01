
$(document).ready(function() {

$('input[id*=Temp]:not(.knob)').focusin(function() {
  $("#inputTempKnobs").show();
  n = $(document).height();

    $('html, body').animate({ scrollTop: n }, {duration: 1000}, {complete: function() {
      
     }});
    
});

$('input[id*=Temp]:not(.knob)').focusout(function() {
  $("#inputTempKnobs").hide();  

  //take any integers out of the field and change to proper formatting
  if( parseInt($(this).val()) != null )
  {
    console.log("greater than zero and not null");
    var test = parseInt($(this).val()).toString();
    if(test != "NaN")
    {
    console.log(test);
     $(this).val(test.toString() + " F"+'\xB0');   
    }
    //if no integers, reset field aka blank
    else
    {
     $(this).val("");    
    }
  
   }
     
  
});

// $( "#inputTempKnobsClick" ).click(function() {
  
//    $("#inputTempKnobs").toggle();
// });


$(function($) {
                $(".knob").knob({
                    'font': '',
                    change : function (value) {
                        //console.log("change : " + value);
                    },
                    release : function (value) {
                        //console.log(this.$.attr('value'));

                        //console.log("release : " + value);
                                                
                        $('#'+this.i[0].id.replace("knob", "input")).val(value + ' F'+'\xB0');
                        //$('thisme').val(value + ' F'+'\xB0');
                    },
                    cancel : function () {
                        //console.log("cancel : ", this);
                    },
                    format : function (value) {
                        
                        //console.log('format');

                        //$('#'+this.i[0].id.replace("knob", "input")).val(value + ' F'+'\xB0');
                        value = value + ' F'+'\xB0';
                        return value;
                    },
                    draw : function () {
                        //$('#'+this.i[0].id.replace("knob", "input")).val(value + ' F'+'\xB0');
                        //console.log("draw : " );
                        // "tron" case
                        if(this.$.data('skin') == 'tron') {
                            this.cursorExt = 0.3;
                            var a = this.arc(this.cv)  // Arc
                                , pa                   // Previous arc
                                , r = 1;
                            this.g.lineWidth = this.lineWidth;
                            if (this.o.displayPrevious) {
                                pa = this.arc(this.v);
                                this.g.beginPath();
                                this.g.strokeStyle = this.pColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                                this.g.stroke();
                            }
                            this.g.beginPath();
                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                            this.g.stroke();
                            this.g.lineWidth = 2;
                            this.g.beginPath();
                            this.g.strokeStyle = this.o.fgColor;
                            this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                            this.g.stroke();
                            return false;
                        }
                    }
                });
                // Example of infinite knob, iPod click wheel
                // var v, up=0,down=0,i=0
                //     ,$idir = $("div.idir")
                //     ,$ival = $("div.ival")
                //     ,incr = function() { i++; $idir.show().html("+").fadeOut(); $ival.html(i); }
                //     ,decr = function() { i--; $idir.show().html("-").fadeOut(); $ival.html(i); };
                // $("input.infinite").knob(
                //                     {
                //                     min : 0
                //                     , max : 20
                //                     , stopper : false
                //                     , change : function () {
                //                                     if(v > this.cv){
                //                                         if(up){
                //                                             decr();
                //                                             up=0;
                //                                         }else{up=1;down=0;}
                //                                     } else {
                //                                         if(v < this.cv){
                //                                             if(down){
                //                                                 incr();
                //                                                 down=0;
                //                                             }else{down=1;up=0;}
                //                                         }
                //                                     }
                //                                     v = this.cv;
                //                                 }
                //                     });
            });
});