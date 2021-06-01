---
title: "Spicy Meatballs - Frying a Swedish ECU."
date: "2020-01-28"
---

So some of previous adventures involved tinkering with the Digifant ECU in my Polo G40, open-sourcing the tuning maps and decompiled binary files. I'd love to tinker with the innards of the my new Volvo V60 Polestars ECU, but I don't think I can stomach frying it just yet, as it's the most expensive car I've ever owned and I don't suppose the ECU's come cheap.

So Volvo's for some time have come with Volvo On Call. An onboard module capable with a GPS sensor, sim card and ability to collect and transmit telemetry straight to Gothenburg city. Users can use their smartphone to connect with it.  
  
Direct from Volvo's blurb:-

> **Volvo** **On** **Call** will present you with all the information you need to know about your car - whether it is locked, in use, the current fuel range, the temperature outside the car, access to the owner's manual, maintenance needs and a driving journal that can help you to keep track of your personal and/or business use of the car including trips taken and mileage accumulated.

Great. Although it has some issues.

1. The on-call brain in the vehicle sometimes fails to update, when the car is switched off and packed up. This is awkward, as the cars location is hidden when the car is known to be in use / in motion, and it stops you from performing functions against the car, for obvious safety reasons. It is frustrating when your car is parked, and you cant track where it is, rendering the tracking function useless and failing to alert you to the vehicle genuinely being broken into or stolen. Equally frustrating is the inability to pre-heat the car by remote starting the engine on cold mornings.
2. The ECU suffers from a GPS Rollover bug ([https://www.theregister.co.uk/2019/02/12/current\_gps\_epoch\_ends/](https://www.theregister.co.uk/2019/02/12/current_gps_epoch_ends/)) which causes journeys to start from the year 2000, 16 years before the car was built!

![](https://you54f.files.wordpress.com/2020/01/82316881_10157616907026343_5506893542355632128_n-1.jpg?w=960)

Here we can see an implausibly long journey, starting in the past.

So the

![](https://you54f.files.wordpress.com/2020/01/img_4011.png)

![](https://you54f.files.wordpress.com/2020/01/img_4012.png?w=576)

The volvo-on-call app consumes from a rest-api. [Erik Eriksson](http://github.com/molobrakos) over on [GitHub](https://github.com/molobrakos/volvooncall) put together a python app, which will allow you to pull down data from Volvo On Call's REST API.

![](https://you54f.files.wordpress.com/2020/01/voc_dashboard-1.png?w=1024)

This does mean that any issues with the data, will be down to the ecu in the car, rather than anything in the app.
