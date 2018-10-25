<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="FormLayoutTemplate.ascx.cs" Inherits="VisualFormBuilder.Controls.FormLayoutTemplate" %>

<script id="form-layout-template" type="text/x-jquery-tmpl">
    <ul class="nav nav-tabs pull-left">
        {{if RootFormId > 0}}
	    <li><a data-toggle="tab" href="#root">${RootFormName}</a></li>
        {{/if}}
	
        <li class="active"><a data-toggle="tab" href="#main">${FormName}</a></li>

        {{if FormTypeId == 1}}
        {{each(i,v) ChildForms}}
            <li><a data-toggle="tab" href="#child_${v.FormID}" onclick="LoadChildFormDesigner(${v.FormID})">${v.FormName}</a></li>
        {{/each}}
	    <li><a href="javascript:void(0)" data-toggle="modal" data-target="#AddFormPopup"><i class="glyphicon glyphicon-plus"></i></a></li>
        {{/if}}
    </ul>

    <div class="pull-right text-right" id="action-btns">
        <button type="button" class="btn btn-primary action-button" data-action="save" disabled="disabled">Save</button>
        <button type="button" class="btn btn-default action-button" data-action="back">Back to List</button>
    </div>

    <div class="clearfix"></div>

    <div class="tab-content">
        {{if RootFormId > 0}}
	    <div id="root" class="tab-pane fade">
            <div class="drag-drop-area"></div>
        </div>
        {{/if}}
    
	    <div id="main" class="tab-pane fade in active">
            <div class="drag-drop-area" id="form-design-area" data-content="Drag layout controls from the left side-bar into this space to begin building your form."></div>
        </div>

        {{if FormTypeId == 1}}
        {{each(i,v) ChildForms}}
            <div id="child_${FormID}" class="tab-pane fade">
                <div class="drag-drop-area"></div>
            </div>
        {{/each}}
        {{/if}}
    </div>
</script>
