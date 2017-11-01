import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Election, ElectionService} from '../../services';

@Component({
	selector: 'app-login-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	elections: Election[];
	currentElections: Election[];
	futureElections: Election[];
	pastElections: Election[];

	constructor(private router: Router, private electionService: ElectionService) {

	}

	ngOnInit() {
		this.electionService.getAllElections().then((elections: Election[]) => {
			this.elections = elections;
			this.currentElections = [];
			this.futureElections = [];
			this.pastElections = [];
			const currentDate = new Date();

			for (let i = 0; i < this.elections.length; i++) {
				if (this.elections[i].dateTo < currentDate) {
					this.pastElections.push(this.elections[i]);
				} else if (this.elections[i].dateFrom > currentDate) {
					this.futureElections.push(this.elections[i]);
				} else {
					this.currentElections.push(this.elections[i]);
				}
			}
		});
	}

	electionEdit(election) {
		this.router.navigate(['/election/' + election._id + '/edit']);
	}

	electionDetails(election) {
		this.router.navigate(['/election/' + election._id + '/details']);
	}

	nominateCandidate(election) {
		this.router.navigate(['/election/' + election._id + '/nominate-candidate']);
	}

}
