import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell-home',
  templateUrl: './sell-home.component.html',
  styleUrls: ['./sell-home.component.scss']
})
export class SellHomeComponent implements OnInit {
  sellHome: any;
  constructor() { }

  ngOnInit(): void {
    this.sellHome = [
      {
        type: 1,
        image: 'assets/landing/sell/sell-3.png' ,
        title: 'Sell Your Home',
        description: 'The decision to sell your home isn’t a small one. It’s a huge undertaking, financially and mentally, and determining the right marketing strategy is critical. Work with Re-Connect to ensure the price is right to attract the right kind of buyers and weed out chancers. That’s not even taking into account the 1001 other details that need to be explored, which we’ll work with you to sort out. You can count on the Re-Connect team to guide you through every stage of the home-selling process, so you can focus on closing this chapter of your life and seamlessly transitioning into the next one. Hassle-free. Chat to us before putting your home on the market to ensure you price it right, stage it right, and get the ROI you deserve.'
      },
      {
        type: 2,
        image: 'assets/landing/sell/sell-4.png' ,
        title: 'Dedicated Marketing Team',
        description: 'The Re-Connect team is unlike any other real estate crew on Earth. We are uniquely trained to perform comparables, appraisal style. Plus, we’re all trained by actual real-world appraisers which our clients agree makes a huge difference and reflects in the output. When you work with Re-Connect, you’ll be assigned a dedicated marketing team who’ll take professional pictures of your property and post them on social media on your behalf. Beyond this, we are devoted to doing everything in our power to ensure your property is well marketed!'
      },
      {
        type: 1,
        image: 'assets/landing/sell/sell-5.png' ,
        title: 'Virtual Tours',
        description: 'Give prospective buyers an authentic idea of what it’s like to live in your property, through fascinating and realistic virtual tours. It’s like being right there, with advanced technology that escorts curious leads through every nook and cranny of your home. Upon your request, we’ll travel to your property to capture every corner of every room using advanced 3D camera technology. Interested home-buyers can enjoy their virtual walkthroughs from their smartphones, anywhere, anytime, immersing themselves in your stunning space via one intuitive online platform. This virtual tour technology eliminates chancers by giving serious buyers the chance to imagine life in your home and seize the opportunity before someone else does. We at Re-Connect create unforgettable digital virtual tour experiences, digitizing your space and capturing its character in full 3D and 4K glory. Viewers can explore a digital twin of your property, inside and out, with additional access to floorplans and measurements if needed.'
      },
      {
        type: 2,
        image: 'assets/landing/sell/sell-6.png' ,
        title: 'Highly Trained Agents',
        description: 'Every member of the Re-Connect team is meticulously trained to help you sell your home. We combine the best of old-school and new-age marketing tactics to significantly tighten the road to transaction closure so that you can move on with your life as soon as possible. Allow our highly trained agents to list your home and create its digital twin, so interested buyers can start taking virtual tours immediately.'
      },
      {
        type: 1,
        image: 'assets/landing/sell/sell-8.png' ,
        title: 'Follow The Process',
        description: 'What’s the latest on the sale of your home? Log in to the system to find out! You can easily follow the process of your home sale at a glance, and you barely need to lift a finger. View open house schedules, showing appointments, offers, appraisals, home inspections, and more.'
      },
    ];
  }

}
