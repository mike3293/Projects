<template>
    <div class="home">
        <h2 class="home__title">
            Home page
            <br />
            {{info}}
        </h2>
        <img src="../shared/assets/Untitled.png" />
        <img src="../shared/assets/logo.png" />
        <br />
        <img v-bind:src="picture" />
        <div class="pic"></div>
    </div>
</template>
<style lang="scss">
.home {
    &__title {
        color: navy;
    }
}

.pic {
    background-image: url("../shared/assets/logo.png");
    margin: auto;
    height: 200px;
    width: 200px;
}
</style>
<script>
import pic from "../shared/assets/logo.png";

export default {
    data: function() {
        return {
            info: null,
            picture: pic,
            version: process.env.VUE_APP_VERSION,
            enviroment: process.env.NODE_ENV
        };
    }
    // mounted() {
    //     //for test
    //     const REST_API_KEY = "cRESoEW5HdJlDoWRKXuSkr";
    //     const APP_ID = "cKkCoesL9cP5Leo8oRpCoI";
    //     const FORM_ID = "bJW6FdM1DeW6ddQmkitSoX";

    //     const LOGIN_HASH = "bxWRCuFKncGQ7dJ1pdScy6";
    //     const PASSWORD_HASH = "c6W6rNW51kW7JdPWn8smkg";
    //     const GROUP_HASH = "dcHmoSmLvdOz5_tXhdOCod";
    //     //const TOKEN_HASH = "ddK8knF8jbq4oXWOqXWOvn";

    //     // (async function() {
    //     //     const response = await fetch(
    //     //         `https://quintadb.ru/apps/${APP_ID}/dtypes/entity/${FORM_ID}.json?rest_api_key=${REST_API_KEY}`
    //     //     );
    //     //     const myJson = await response.json();
    //     //     return (
    //     //         myJson.records[0].values[LOGIN_HASH] +
    //     //         " " +
    //     //         myJson.records[0].values[PASSWORD_HASH] +
    //     //         " " +
    //     //         myJson.records[0].values[GROUP_HASH] +
    //     //         " | " +
    //     //         myJson.records[1].values[LOGIN_HASH] +
    //     //         " " +
    //     //         myJson.records[1].values[PASSWORD_HASH] +
    //     //         " " +
    //     //         myJson.records[1].values[GROUP_HASH]
    //     //     );
    //     // })().then(str => (this.info = str));

    // }
};
</script>