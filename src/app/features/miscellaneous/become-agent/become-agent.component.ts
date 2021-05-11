import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-become-agent',
  templateUrl: './become-agent.component.html',
  styleUrls: ['./become-agent.component.scss']
})
export class BecomeAgentComponent implements OnInit {
  agent: any;
  constructor() { }

  ngOnInit(): void {
    this.agent = [
      {
        type: 2,
        image: 'assets/landing/agent/agent-2.png' ,
        title: 'The Lives We Change',
        description: 'Re-Connect is more than your average real estate business. We are absolutely passionate about changing lives, starting with changing the way people buy and sell homes - forever. If you share our vision, and you believe you have what it takes to become a Re-Connect agent, don’t keep it to yourself. We’d love to hear from you.'
      },
      {
        type: 1,
        image: 'assets/landing/agent/agent-3.png' ,
        title: 'A Winning Team',
        description: 'When we say there’s no other team on the planet like Re-Connect, we mean it. We are the only real estate crew in the world that helps buyers purchase properties based on their true affordability, while guiding them through the process step by simple step. Our winning team is one-of-a- kind, proving that there is a better and more creative way to buy or sell a home - underpinned by education and empowerment. Our team can’t wait to meet you and use their decades of experience to help you solve your property buying and selling problems once and for all.'
      },
    ];
  }

}
