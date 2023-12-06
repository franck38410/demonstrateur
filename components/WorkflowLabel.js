'use client';

export default function WorkflowLabel(workflowState) {
    console.log("getWorkflowState workflowState= "+workflowState);
    let workflowLabel = workflowState;
    switch (workflowState) {
      case '0':
        workflowLabel = "Creation";
        break;
      case '1':
        workflowLabel = "Expedition";
        break;
      case '2':
        workflowLabel = "Reception";
        break;
      case '3':
        workflowLabel = "Annulation";
        break;
      case '4':
        workflowLabel = "Renvoyer";
        break;
    }
    return workflowLabel;

}