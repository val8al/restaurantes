import { NodeWithI18n } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {ServiceComponent} from 'src/app/service/service.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private service:ServiceComponent){};

  ngOnInit(){
    this.getCurrentFood()
  }

  formulario: FormGroup = new FormGroup({
    'waiter': new FormControl(),
    'weekday': new FormControl(),
    'hour' : new FormControl(),
    'suffix': new FormControl()
  });
  title = 'frontend';
  waiters= ['JILLIAN N.', 'ASHLEY C.', 'KAITLIN E.', 'TAYLOR P', 'DEB D.', 'DEE V.', 'KELLY K.', 'HAILEY W.', 'EMMA B.', 'EMILY D.', 'ALLY K.', 'GABRIELLA M.', 'RETA D.', 'JORDYN J.', 'KAITLIN B.', 'BAILEY T.']; 
  days = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sábado','Domingo']
  hours= [1,2,3,4,5,6,7,8,9,10,11,12]
  hSuffix = ['AM','PM']
  links = {}
  now = new Date();
  later = 0
  day = this.days[this.now.getDay() - 1] 
  time = this.now.getUTCHours()-6
  responseItem = null
  resposeShow = null
  currentFoodType = null
  imageMap = {
    "STARTERS":"https://img.taste.com.au/-8rQxfvC/w643-h428-cfill-q90/taste/2016/11/chorizo-croquettes-66421-1.jpeg",
    "SANDWHICHES":"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/egg-cress-club-sandwich_0-43a103c.jpg?quality=90&resize=500%2C454",
    "BREAKFAST":"https://thumbor.thedailymeal.com/eakBw6ct7y0NoE7boW9vN72Hsbw=/870x565/filters:focal(600x400:601x401):format(webp)/https://www.thedailymeal.com/sites/default/files/2019/01/18/0-Utah-MAIN2.jpg",
    "PIZZA": "https://tvpacifico.mx/recetas/intranet/images/recipes/330-349.jpg",
    "DESSERTS": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-friedicecream-072-1587757338.jpg?crop=1xw:1xh;center,top&resize=480:*",
    "JUNIOR MENU":"https://www.eatright.org/-/media/eatrightimages/food/planningandprep/cookingtipsandtrends/food-styling-tips-for-kids-613335408.jpg?h=450&w=600&la=en&hash=67474C94BA7CB960B25C52D902120ADA7628F04E",
    "RICE BOWLS AND PASTA":"https://images-gmi-pmc.edge-generalmills.com/700969ec-1efe-47e5-bb06-a808c5e1785d.jpg",
    "SOUP": "https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/mulligatawny_soup_68949_16x9.jpg"
  
  }

  currentImageLink = this.imageMap['STARTERS'];


  getCurrentFood(){
    var body = {"service":0,"server":0,"hour":this.now.getHours(),"day":this.now.getDay(),"allergy":0}
    console.log(body);
    try{
      this.service.getFoodType(body).subscribe(res =>  {
        this.currentFoodType = res['recommendation'];
      });
   
    }catch(e){
      console.log(e)
    }

  }

  updateCurrentImage(){
    if(this.responseItem == null){
      this.currentImageLink = this.imageMap[this.currentFoodType]
    }else{
      this.currentImageLink = this.imageMap[this.responseItem] 
    }
    console.log(this.currentFoodType);
  
  }

  enviar(){
   
    var body = {"service":0,"server":0,"hour":0,"day":0,"allergy":0}
    body["server"] = this.waiters.indexOf(this.formulario.controls["waiter"].value) +1
    body["day"] = this.days.indexOf(this.formulario.controls["weekday"].value) + 1

    var intHour = this.formulario.controls["hour"].value
    if(this.formulario.controls["suffix"].value === "PM"){
      intHour = parseInt(intHour) + 12;
      if(intHour === 24){
        intHour= 0;
      }
    }
    body["hour"] = intHour;

    try{
      this.service.getFoodType(body).subscribe(res =>  {
        this.responseItem = res['recommendation'];
        this.updateCurrentImage()
        console.log(this.responseItem);
      });
   
    }catch(e){
      console.log(e)
    }

  }



}

