Solar Interference Visualization Simulation
===========================================

Release Notes:
* Only works on devices that fire the "devicemotion" event
* Only works in browsers that support the -webkit gradient prefix
* Inefficient, and provides no real-world value
* Entertaining

Usage:
```
//apply glare to the entire web page
$('body').glare();
```

Advanced Usage:
```
//Output a mess of debug options
$('body').glare({debug:true});
```