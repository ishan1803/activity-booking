import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';
import { RoleType } from '../models/Role.model';
import { UserHelper } from '../models/User.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements AfterViewInit {
  users: User[] = [];

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef, private userService: UserService, private location: Location,) {}

  ngAfterViewInit() {
    const tbody = this.el.nativeElement.querySelector('tbody');
    // Clear any existing rows to avoid duplication
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.users.forEach((user, i) => {
        const tr = this.renderer.createElement('tr');
        this.renderer.setStyle(tr, 'background-color', i % 2 === 0 ? 'white' : '#e7f3ff');

        const tdName = this.renderer.createElement('td');
        const nameText = this.renderer.createText(user.name);
        this.renderer.appendChild(tdName, nameText);

        const tdEmail = this.renderer.createElement('td');
        const emailText = this.renderer.createText(user.email);
        this.renderer.appendChild(tdEmail, emailText);

        const tdRole = this.renderer.createElement('td');
        const roleText = this.renderer.createText(RoleType.extractRoles(user.roles).join(', '));
        this.renderer.appendChild(tdRole, roleText);

        const tdActions = this.renderer.createElement('td');
        if (UserHelper.hasRole(user, RoleType.CUSTOMER)) {
          const button = this.renderer.createElement('button');
          const buttonText = this.renderer.createText('Bookings');
          this.renderer.appendChild(button, buttonText);
          this.renderer.listen(button, 'click', () => this.goToBookings(user));
          this.renderer.appendChild(tdActions, button);
        }

        this.renderer.appendChild(tr, tdName);
        this.renderer.appendChild(tr, tdEmail);
        this.renderer.appendChild(tr, tdRole);
        this.renderer.appendChild(tr, tdActions);

        this.renderer.appendChild(tbody, tr);
      });
    });
  }

  goToBookings(user: User) {
    const userId = user.id;
    this.router.navigateByUrl('/bookings/' + userId);
  }

  goBack() {
    this.location.back();
   }
}
