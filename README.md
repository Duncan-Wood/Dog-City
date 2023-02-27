# Whiteboarding:
- Create an App called Dog City (name pending), a paradise for dog lovers who wish to learn more about their favorite breeds.
- home page should have an elegant design, with a random photo generated and a random dog fact generated to get users interested upon arrival.
- nav bar at the top should include a home button, a breeds button, a random breed button, and 2 stretch pages: one for finding adoptable pets in people's areas and another for a contact page in case users wish to contact me with job opportunities after viewing my amazing site.
    - breeds page will include a drop-down (and search bar?) for users to find their desired breeds from the repository. (there are 172 breeds available). Below the search/drop down, users should see a grid with a photo and name of all the breeds available, with functionality to click on a breed to pull up the breedDetails page for that breed. 
        - breedDetails will combine information from The Dog Api and Dogs Api displaying an array of information including:
            - from The Dog API
                - a picture
                - breed name
                - bred for (eg pointing and trailing)
                - breed group (eg sporting)
                - life-span
                - temperament
                - weight range
                - height range
            - from Dogs API (rating 1-5) (maybe convert the values to a visual graph?)
                - good with children
                - good with other dogs
                - shedding
                - grooming
                - drooling
                - coat length
                - good with strangers
                - playfulness
                - protectiveness
                - trainability
                - energy
                - barking
        - **stretch goal** breed details would also have a button to search for any available adoptions near the user utilizing the PetFinder API)
    - random breed button will take user to a random breedDetails page and have the same information from breedDetails. I can also include a button to find another random dog and potentially pop it into a grid on that page if people want to compare. 



### Resources
- [The Dog API](https://thedogapi.com/)
- [Dogs API (more information for each breed)](https://api-ninjas.com/api/dogs)
- [TheDogAPI documentation](https://documenter.getpostman.com/view/5578104/2s935hRnak#auth-info-7b2d907b-6275-41df-9f0e-33e80a79399a)
- [A third API that generates a random dog fact](https://dukengn.github.io/Dog-facts-API/)
- [The Dog API usage tutorial](https://www.youtube.com/watch?v=wszFDXP0lkA&t=518s)
- [Backup API for random dog photos](https://dog.ceo/dog-api/)
- [potential stretch goal: api for accessing adoptable pets](https://www.petfinder.com/developers/v2/docs/)
- [List of Public APIs](https://github.com/public-apis/public-apis)
- [List of more APIs](https://github.com/n0shake/Public-APIs)
- [ChatGPT](https://openai.com/blog/chatgpt/)
- [header field for axios request](https://stackoverflow.com/questions/72012458/how-to-add-a-header-field-with-value-as-api-key-in-react-axios-request)


### Previous Lessons for Reference
- [Project 2](https://github.com/seir-123/project2_prompt/blob/main/README.md)
- [Login: useContext Lab](https://github.com/seir-123/u2_react_useContext_lab)
- [userInfo: useContext Lesson](https://github.com/seir-123/u2_lesson_useContext)
- [Games: react router lab](https://github.com/seir-123/u2_lab_react_router)
- [Boats: react router lesson](https://github.com/seir-123/u2_lesson_react_router)
- [Star Wars: react axios lab](https://github.com/seir-123/u2_react_axios_lab)
- [Movies: react axios lesson](https://github.com/seir-123/u2_lesson_react_APIs)
- [counter: react use effect lesson](https://github.com/seir-123/u2_lesson_useEffect)