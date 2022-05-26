package com.bipv.document.bipvbackend;

public class DocumentInfo {
    private String documentNo;
    private String documentType;
    private String dateReceived;
    private String projectStage;
    private String documentSize;
    private String sentBy;
    private String receivedBy;
    private String mainContent;
    private String documentLink;

    // private String ownedBy;
    // private String documentName;
    private String lastModification;
    // private String id;
    private String transferMessage;

    public String getLastModification() {
        return this.lastModification;
    }

    public void setLastModification(String lastModification) {
        this.lastModification = lastModification;
    }

    // public String getId() {
    //     return this.id;
    // }

    // public void setId(String id) {
    //     this.id = id;
    // }

    // public String getOwnedBy() {
    //     return this.ownedBy;
    // }

    // public void setOwner(String owner) {
    //     this.ownedBy = owner;
    // }

    // public String getDocName() {
    //     return this.documentName;
    // }

    // public void setDocName(String name) {
    //     this.documentName = name;
    // }

    public String getDocumentNo() {
        return this.documentNo;
    }

    public void setDocumentNo(String documentNo) {
        this.documentNo = documentNo;
    }

    public String getDocumentType() {
        return this.documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDateReceived() {
        return this.dateReceived;
    }

    public void setDateReceived(String dateReceived) {
        this.dateReceived = dateReceived;
    }

    public String getProjectStage() {
        return this.projectStage;
    }

    public void setProjectStage(String projectStage) {
        this.projectStage = projectStage;
    }

    public String getDocumentSize() {
        return this.documentSize;
    }

    public void setDocumentSize(String documentSize) {
        this.documentSize = documentSize;
    }

    public String getSentBy() {
        return this.sentBy;
    }

    public void setSentBy(String sentBy) {
        this.sentBy = sentBy;
    }

    public String getReceivedBy() {
        return this.receivedBy;
    }

    public void setReceivedBy(String receivedBy) {
        this.receivedBy = receivedBy;
    }

    public String getMainContent() {
        return this.mainContent;
    }

    public void setMainContent(String mainContent) {
        this.mainContent = mainContent;
    }

    public String getDocumentLink() {
        return this.documentLink;
    }

    public void setDocumentLink(String documentLink) {
        this.documentLink = documentLink;
    }

    public void setTransferMessage(String transferMessage) {
        this.transferMessage = transferMessage;
    }

    public String getTransferMessage() {
        return this.transferMessage;
    }
    
}
