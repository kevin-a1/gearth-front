export default function validatePlan(values){
    let errors=[

    ];
    if(!values?.name){
       
        errors.name = "Name required";
    }

    if (!values?.description) {
        errors.description = 'Description required';
    }


    if (!values?.members_number) {
        errors.members_number = 'Number of members required';
    } else if (values.members_number < 1) {
        errors.members_number = 'Member`s number must be at least 1';
    }

    
    if (!values?.discount<0) {
        errors.discount = 'Discount must be greater or equals to 0';
    } 

    if (!values?.price<0) {
        errors.price = 'Price must be greater or equals to 0';
    } 

    return errors;

}