import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-buy-home',
    templateUrl: './buy-home.component.html',
    styleUrls: ['./buy-home.component.scss']
})
export class BuyHomeComponent implements OnInit {
    buyHome: any;

    constructor() {
    }

    ngOnInit(): void {
        this.buyHome = [
            {
                type: 1,
                image: 'assets/landing/buy/buy-2.png' ,
                title: 'My Home Buying Team',
                description: 'Re-Connect is the only real estate business of its kind to connect its buyers with a Home Buying team, dedicated to help you bypass common rookie mistakes. You can assemble your home buying crew as soon as you register and enter your back office from the categories required to purchase a property. Referred by someone you know? Let the system automatically compile a winning team based on the professionals that supported your contact. Using Re-Connect truly is a no-brainer - doing everything in its power to help you afford and buy the home of your dreams. Even if it means showing you how to negotiate seller credit into your offer to cover closing costs with confidence, with Re-Connect’s help, you can qualify for your dream home in record time - proving that dreams really do come true.'
            },
            {
                type: 2,
                image: 'assets/landing/buy/buy-3.png' ,
                title: 'How A Pre-Approval Works',
                description: 'Registered in the system? Got your team ready? Great! It’s time to get pre-approval from your selected lender. If the lender isn’t available in our system, you can invite them to register for FREE in minutes. Once your lender has pre-approved you based on monthly payments AND purchase price, your pre-approval letter will be generated from your unique pre-approval parameters. The system intelligently analyzes all of your details, combined with MLS property search, to separate the properties you do and don’t qualify for. This is important, because your pre-approval is based on payment, not price - and, two identically-priced homes could carry two totally different payments!'
            },
            {
                type: 1,
                image: 'assets/landing/buy/buy-4.png' ,
                title: 'Integrated Pre-Approval Search',
                description: 'Not qualifying for the home of your dreams? Don’t give up just yet. Let the sophisticated Re-Connect system offer alternative options for scenarios to help you qualify. Wondering what situation should you be striving for, in order to be eligible for pre-approval? Our system will make calculations and suggestions on your behalf, so you can work towards achieving your dreams. Re-Connect combines your pre-approval with the MLS search engine to provide you with a payment-based search engine, instead of the more traditional price-based search engine. The difference will be crystal clear from the very first use, and ultimately, Re-Connect will let you buy based on true affordability.'
            },
            {
                type: 2,
                image: 'assets/landing/buy/buy-5.png' ,
                title: 'Rent VS Own Calculator',
                description: 'How long do you plan on living in the home you’ve got your eye on? Is it really worth buying, or should you keep renting the place you’re currently living in? Use this calculator to find out. For example, if you want to buy now with the goal of selling in a few years, you might lose money due to a not having time to build enough equity, not to mention the costs involved with acquiring and selling the property. In a case like this, it might be better to keep renting where you are now. This calculator takes your current monthly rent into account and compares it with a true payment for the property you are looking at, all based on your unique pre-approval. Once you input how long you plan on keeping the home for, it will tell you whether or not it’s worth buying. Find out now!'
            },
            {
                type: 1,
                image: 'assets/landing/buy/buy-6.png' ,
                title: 'Home Buying 101',
                description: 'Re-Connect makes it easier than ever to find and buy the property of your dreams. Consider Home Buying 101 your own personal virtual assistant, overflowing with a long list of educational videos, resources, and general guidance to further educate you on the home buying process. THAT’S the Re-Connect difference!'
            },
        ];
    }

}
