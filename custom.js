// Часы работы

let startHours = 9;
let endHours = 21;

/* ОПРЕДЕЛЯЕМ РАБОЧИЙ ИЛИ ВЫХОДНОЙ ДЕНЬ */
// Получаем текущий год, месяц и день и заносим в переменные
let nowYear = moment().format("YYYY");
let nowMonth = moment().format("MM");
let nowDay = moment().format("DD");

/* Установите таймзону своего региона. Можно посмотреть здесь: https://momentjs.com/timezone/. 
   По умолчанию стоит Московское время */
let nowHours = moment().tz('Europe/Moscow').format("H");

// Подставляем данные в API запрос. Подробнее на сайте: https://isdayoff.ru и на habr: https://habr.com/ru/post/405519/
let url = 'https://isdayoff.ru/api/getdata?year=' + nowYear + '&month=' + nowMonth + '&day=' + nowDay;

// Создаем запрос и проверяем на ошибки
fetch(url)
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Похоже возникла проблема. Код: ' +  
          response.status);  
        return;  
      }

      // Проверяем запрос  
      response.json().then(function(data) {

        // Проверяем ответ сервиса

        /* 

        ВОЗМОЖНЫЕ РЕЗУЛЬТАТЫ

        Ответ сервиса	- Значение
        0	- Рабочий день
        1	- Нерабочий день
        2	- Сокращённый рабочий день
        100	- Ошибка в дате
        101	- Данные не найдены
        199	- Ошибка сервиса

        */

        if(data === 0) {
          console.log('Рабочий');

          // Проверяем рабочие сейчас часы или нет
          if(nowHours >= startHours && nowHours < endHours) {
            console.log('Рабочее время');
            $('#status').removeClass('offline').addClass('online');
          } else {
            console.log('Время отдыха');
            $('#status').removeClass('online').addClass('offline');
          }
        } else {
          console.log('Выходной');
          $('#status').removeClass('online').addClass('offline');
        }

      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch ошибка :-S', err);  
  });

