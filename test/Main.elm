port module Main exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes exposing (class)

port foo : String -> Cmd msg
port bar : (String -> msg) -> Sub msg

main : Program () Model Msg
main =
  Browser.element
    { init = init
    , update = update
    , view = view
    , subscriptions = subscriptions
    }

type alias Model
  = String

init : () -> ( Model, Cmd Msg )
init _ =
  ( ""
  , foo "Hello from Elm!"
  )

type Msg
  = KeyDown String

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    KeyDown key ->
      ( key
      , Cmd.none
      )

view : Model -> Html Msg
view model =
  Html.div [ class "created-by-elm" ]
    [ Html.text "The last key pressed was: "
    , Html.text model
    ]

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.batch
    [ bar KeyDown
    ]