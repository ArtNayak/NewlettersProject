let dayName= "monday";
function getDayNumberIfelse(dayName) {
    dayName = dayName.toLowerCase(); // Convert to lowercase for comparison
    if (dayName === "monday") {
        return 1;
    } else if (dayName === "tuesday"){
        return 2;
    }
    else if (dayName === "wednesday"){
    return 3;
}
    else if (dayName === "thursday"){
    return 4;
}
    else if (dayName === "friday"){
    return 5;
}
    else if (dayName === "saturday"){
    return 6;
}
    else if (dayName === "sunday"){
    return 7;
}
    else{
    return 0;

}
}
function getDayNumberSwitch(dayName) {
    dayName = dayName.toLowerCase();
    switch (dayName) {
        case "monday":
            return 1;
        case "tuesday":
            return 2;
        case "wednesday":
            return 3;
        case "thursday":
            return 4;
        case "friday":
            return 5;
        case "saturday":
            return 6;
        case "sunday":
            return 7;
        default:
            return "Invalid day name";
    }   
}

console.log("Input Day:", dayName);
console.log("Using if-else: Day number is", getDayNumberIfelse(dayName));
console.log("Using switch: Day number is", getDayNumberSwitch(dayName));