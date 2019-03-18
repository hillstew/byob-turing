## `/api/v1/cohorts`
---
#### ```GET``` 
#### parameters: none
```
    {
      "id": 22,
      "cohort_num": 1810,
      "current_mod": "4",
      "lead_instructor": "Leta Keane",
      "created_at": "2019-03-17T17:39:41.375Z",
      "updated_at": "2019-03-17T17:39:41.375Z"
    }

    response - 200 - array of all cohort objects
```

#### ```POST``` 
#### parameters: see table below
| name | type    | required  |
|:---| :--------|:---------|
| `cohort_num`    | string |   yes |
| `current_mod`    | string  | yes |
| `lead_instructor`   | string |   yes |

```
    response - 200,  the id of the created cohort
```

## `/api/v1/cohorts/:id`
----
#### ```GET``` 
#### parameters: ```id - string```

```
    
    {
        "id": 22,
        "cohort_num": 1810,
        "current_mod": "4",
        "lead_instructor": "Leta Keane",
        "created_at": "2019-03-17T17:39:41.375Z",
        "updated_at": "2019-03-17T17:39:41.375Z"
    }

    response - 200 - object representing the specified cohort
```

## `/api/v1/students`
---
#### `GET`
### parameters: none
```
    {
      "id": 127,
      "pronouns": "she/her",
      "first_name": "Hillary",
      "last_name": "Stewart",
      "cohort_id": 22,
      "created_at": "2019-03-17T17:39:41.386Z",
      "updated_at": "2019-03-17T17:39:41.386Z"
    }

    response - 200 - array of all student objects
```
#### ```POST``` 
### parameters: see table below
| name | type    | required  |
|:---| :--------|:---------|
| `pronouns`    | string |   yes |
| `first_name`    | string  | yes |
| `last_name`   | string |   yes |
| `cohort_id`   | integer |   yes |

```
    response - 200,  the id of the created cohort
```


## `/api/v1/students/:id`
---
#### `GET`

### parameters: `id` of student, `integer`
```
    {
      "id": 127,
      "pronouns": "she/her",
      "first_name": "Hillary",
      "last_name": "Stewart",
      "cohort_id": 22,
      "created_at": "2019-03-17T17:39:41.386Z",
      "updated_at": "2019-03-17T17:39:41.386Z"
    }

    response - 200 - student object matching specified id
```
#### `DELETE`

### parameters: `id` of student, `integer`
```
    a message stating the deletion was successful

    response - 200
```