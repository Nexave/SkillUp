var number = 5 ;
var userNumber = Number(prompt('Введите число', ''))
while (number!==userNumber) {
	(number < userNumber) ? userNumber = Number(prompt('Ваше число больше. Попробуйте еще раз', '')) : userNumber = Number(prompt('Ваше число меньше.Попробуйте еще раз', ''));		
};
confirm ("Вы победили \nЖелаете продолжить?")
