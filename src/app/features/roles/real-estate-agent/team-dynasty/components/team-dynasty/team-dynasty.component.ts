import { Component, OnInit } from '@angular/core';
import {DynastyService} from '../../services/dynasty.service';
import {take} from 'rxjs/operators';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {TreeNode} from 'primeng/api';
import {Router} from '@angular/router';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-team-dynasty',
  templateUrl: './team-dynasty.component.html',
  styleUrls: ['./team-dynasty.component.scss']
})
export class TeamDynastyComponent implements OnInit {
  data: TreeNode[];
  selectedNode: TreeNode;
  constructor(private dynastyService: DynastyService,
              private helper: HelperService,
              private router: Router,
              private store: StoreService) { }

  ngOnInit(): void {
    this.store.updateProgressBarLoading(true);
    this.getTeamDynasty();
  }
  getTeamDynasty(): void{
    this.dynastyService.getTeamDynasty().pipe(take(1)).subscribe(res => {
        console.log(res);
        if (res.result !== null){
            this.data = this.constructTree(Object.values({...res.result.network}),
            {...res.result.networkUserDetails}, {...res.result.network});
        }
        this.store.updateProgressBarLoading(false);
    }, error => {
      this.store.updateProgressBarLoading(false);
      this.helper.handleApiError(error, 'Failed to retrieve team dynasty');
    });
  }
  constructTree(data, dataMap, network): Array<any> {
    const tree = [];
    console.log(data, dataMap);
    data.forEach((node) => {
      const parent = dataMap[network[node.parent] ? network[node.parent].user : undefined];
      dataMap[node.user].expanded = true;
      dataMap[node.user] = {...dataMap[node.user], ...node}
      if (parent) {
        (parent.children || (parent.children = [])).push(dataMap[node.user]);
      } else {
        tree.push(dataMap[node.user]);
      }
    });
    console.log(tree);
    return tree;
  }
  sendEmail(email: string): void{
    window.location.href = (`mailto:${email}`);
  }
  routeToChat(id): void{
    // this.router.navigateByUrl(`/home/teamMessageBoard?professional=${id}`).then();
  }
}
