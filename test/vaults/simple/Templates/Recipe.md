```varinote
number_of_people|slider::Number of people|1,10,1,2
difficulty|dropdown::Difficulty level|Easy,Medium,Hard,Expert
boiling_time|toggle::Are the eggs large?|false
greeting::Greeting|Bon appetit!
```
## How to boil an egg for {{$number_of_people}} persons

**Difficulty level: {{$difficulty}}**

This is a very complicated recipe, so pay close attention.
* Take **{{$number_of_people * 2}}** eggs.
* Boil them for **{{$boiling_time::12,10}} minutes**.
* Enjoy.
If they are still raw, it's because you forgot to turn the heat on.

***{{$greeting}}***

🥚🥚
