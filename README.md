

```
  sed 's/;/,/g' 20130921.csv > 20130921-comma.csv

  mongoimport --db timetable --collection schedule --type csv --file ~/Desktop/20130921-comma.csv --headerline
```

