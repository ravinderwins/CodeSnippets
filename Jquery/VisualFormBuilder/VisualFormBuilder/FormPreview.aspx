<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FormPreview.aspx.cs" Inherits="VisualFormBuilder.FormPreview" %>

<%@ Register Src="~/Controls/FormLayoutSectionTemplate.ascx" TagPrefix="UC" TagName="FormLayoutSectionTemplate" %>
<%@ Register Src="~/Controls/FormFieldCommonTemplate.ascx" TagPrefix="UC" TagName="FormFieldCommonTemplate" %>
<%@ Register Src="~/Controls/FormFieldLookuplistTemplate.ascx" TagPrefix="UC" TagName="FormFieldLookuplistTemplate" %>
<%@ Register Src="~/Controls/FormFieldDropdownlistTemplate.ascx" TagPrefix="UC" TagName="FormFieldDropdownlistTemplate" %>
<%@ Register Src="~/Controls/FormFieldCheckboxTemplate.ascx" TagPrefix="UC" TagName="FormFieldCheckboxTemplate" %>
<%@ Register Src="~/Controls/FormFieldRadiolistTemplate.ascx" TagPrefix="UC" TagName="FormFieldRadiolistTemplate" %>
<%@ Register Src="~/Controls/FormFieldMultilinetextTemplate.ascx" TagPrefix="UC" TagName="FormFieldMultilinetextTemplate" %>
<%@ Register Src="~/Controls/FormFieldRichtextTemplate.ascx" TagPrefix="UC" TagName="FormFieldRichtextTemplate" %>
<%@ Register Src="~/Controls/FormOptionsTemplate.ascx" TagPrefix="UC" TagName="FormOptionsTemplate" %>
<%@ Register Src="~/Controls/FormSettingsTemplate.ascx" TagPrefix="UC" TagName="FormSettingsTemplate" %>
<%@ Register Src="~/Controls/FormFieldButtonTemplate.ascx" TagPrefix="UC" TagName="FormFieldButtonTemplate" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Form Preview</title>

    <!-- CSS -->
    <link href="../Assets/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Assets/css/style.css" rel="stylesheet" />

    <!-- Scripts -->
    <script src="../Assets/js/jquery/jquery.min.js"></script>
    <script src="../Assets/js/jquery/jquery.ui.min.js"></script>
    <script src="../Assets/js/jquery/jquery.tmpl.min.js"></script>
    <script src="../Assets/js/bootstrap/bootstrap.js"></script>
    <script src="../Assets/scripts/fbuilder.js"></script>
    <script src="../Assets/scripts/vfb.js"></script>

    <script>
        var formId =<%=_FormId%>;
        var formFieldsResponse = '<%= _FormFieldsResponse %>';
        var buttonFieldsResponse = '<%= _ButtonFieldsResponse %>';
        
        var defaultFormFieldsResponse = '';
        var masterFormFieldsResponse = '';

        /* Parse Values */
        formFieldsResponse = formFieldsResponse && formFieldsResponse != '' ? JSON.parse(formFieldsResponse) : '';
        buttonFieldsResponse = buttonFieldsResponse && buttonFieldsResponse != '' ? JSON.parse(buttonFieldsResponse) : '';
    </script>
</head>
<body>
    <div class="container">
        <form id="form1" runat="server">
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <div id="btns-drag-area-container">
                        <div class="drag-drop-area btn-drop-area" id="btns-design-area" data-content="Drag button controls from the left side-bar into this space."></div>
                    </div>
                    <div class="clearfix"></div>
                    <div id="drag-area-container">
                        <ul class="nav nav-tabs pull-left">
                            <li class="active"><a data-toggle="tab" href="#master"><%= _FormName %></a></li>
                        </ul>
                        <div class="pull-right text-right" id="action-btns">
                            <button type="button" class="btn btn-primary action-button" onclick="restorePreviousVersion(<%= _FormId %>)">Restore</button>
                            <button type="button" class="btn btn-default action-button" data-action="back">Back to List</button>
                        </div>
                        <div class="clearfix"></div>

                        <div class="tab-content">
                            <div id="master" class="tab-pane fade in active">
                                <div class="drag-drop-area"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Register Controls -->

            <!-- Layout Controls -->
            <UC:FormLayoutSectionTemplate runat="server" ID="FormLayoutSectionTemplate" />

            <!-- Form Controls -->
            <UC:FormFieldCommonTemplate runat="server" ID="FormFieldCommonTemplate" />
            <UC:FormFieldLookuplistTemplate runat="server" ID="FormFieldLookuplistTemplate" />
            <UC:FormFieldDropdownlistTemplate runat="server" ID="FormFieldDropdownlistTemplate" />
            <UC:FormFieldCheckboxTemplate runat="server" ID="FormFieldCheckboxTemplate" />
            <UC:FormFieldRadiolistTemplate runat="server" ID="FormFieldRadiolistTemplate" />
            <UC:FormFieldMultilinetextTemplate runat="server" ID="FormFieldMultilinetextTemplate" />
            <UC:FormFieldRichtextTemplate runat="server" ID="FormFieldRichtextTemplate" />
            <UC:FormFieldButtonTemplate runat="server" ID="FormFieldButtonTemplate" />

            <!-- Options Template -->
            <UC:FormOptionsTemplate runat="server" ID="FormOptionsTemplate" />

            <!-- Settings Template -->
            <UC:FormSettingsTemplate runat="server" ID="FormSettingsTemplate" />

            <script>
                //forms.bindBasicActions();
                forms.RenderButtonFields();
                forms.RenderFormFileds(formFieldsResponse, '#drag-area-container .drag-drop-area');
            </script>
</form>
    </div>
</body>
</html>
