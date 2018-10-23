import { AuthGuard } from "./../../shared/guard/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        children: [
          {
            path: "",
            loadChildren: "../dashboard/dashboard.module#DashboardModule"
          }
        ]
      },

      {
        path: "profile",
        children: [
          { path: "", loadChildren: "../profile/profile.module#ProfileModule" }
        ]
      },

      {
        path: "task",
        children: [{ path: "", loadChildren: "../task/task.module#TaskModule" }]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutesModule {}
