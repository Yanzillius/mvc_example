const contactsData = [{
        fname: "Anbu",
        lname: "Arasan",
        phone: "190-309-6101",
        email: "anbu.arasan@email.com",
    },
    {
        fname: "Arivu",
        lname: "Mugilan",
        phone: "490-701-7102",
        email: "arivu.mugilan@email.com",
    },
    {
        fname: "Bob",
        lname: "Johnson",
        phone: "574-909-3948",
        email: "bob.johnson@email.com",
    },
    {
        fname: "Raja",
        lname: "Tamil",
        phone: "090-909-0101",
        email: "raja.tamil@email.com",
    },
    {
        fname: "Sundar",
        lname: "Kannan",
        phone: "090-909-0101",
        email: "sundar.kannan@email.com",
    },
];

class AddressBookView {
    init() {
        this.renderContactListModule();
        this.addContactModule()
    }

    renderContactListModule() {
        const contacts = addressBookApp.getAllContacts();
        const $contactListUI = document.getElementById('contact-list');
        $contactListUI.innerHTML = '';
        for (let i = 0, len = contacts.length; i < len; i++) {
            let $li = document.createElement('li');
            $li.classList.add('contact-list-item');
            $li.setAttribute('data-index', i);
            $li.innerHTML = `${contacts[i]['fname']},${contacts[i]['lname']}`;
            $li.addEventListener("click", e => this.renderContactDetailsModule(e)); //что будет если не делать обертку
            $contactListUI.append($li);
        }
    }

    renderContactDetailsModule(e) {
        const $target = e.target;
        let selectedIndex = null;
        if (typeof e === 'object') {
            e.stopPropagation();
            selectedIndex = $target.getAttribute('data-index');

        } else {
            selectedIndex = e;
        }
        this.hightlightCurrentListItem(selectedIndex);
        const selectedItem = addressBookApp.getContact(selectedIndex);
        const $ContactItemUI = document.getElementById('contact-item-details');
        $ContactItemUI.innerHTML = `
            ${selectedItem['fname']} <br>
            ${selectedItem['lname']} <br>
            ${selectedItem['phone']} <br> 
            ${selectedItem['email']}
        `;
    }

    addContactModule() {
        const $addContact = document.getElementById('add-contact-btn');
        $addContact.addEventListener("click", e => this.addContactBtnClicked(e));
    }

    hightlightCurrentListItem(selectedIndex) {
        const $ContactListItems = document.getElementsByClassName('contact-list-item');
        for (let i = 0, len = $ContactListItems.length; i < len; i++) {
            $ContactListItems[i].classList.remove('active');
        }
        $ContactListItems[selectedIndex].classList.add('active');
    }

    addContactBtnClicked() {
        const $addContactInputs = document.getElementsByClassName('add-contact-input');
        let newContact = {};
        for (let i = 0, len = $addContactInputs.length; i < len; i++) {
            let key = $addContactInputs[i].getAttribute('data-key');
            let value = $addContactInputs[i].value;
            newContact[key] = value;
        };
        addressBookApp.addContact(newContact);
        this.renderContactListModule();
    }
};

const addressBookView = new AddressBookView();

class AddressBookController {
    constructor(addressBookView) {
        this.addressBookView = addressBookView;
    }

    init() {
        this.addressBookView.init();
    }

    getAllContacts() {
        return contactsData;
    }

    getContact(index) {
        return contactsData[index];
    }

    addContact(contact) {
        contactsData.push(contact);
    }
};

const addressBookApp = new AddressBookController(addressBookView);
addressBookApp.init();