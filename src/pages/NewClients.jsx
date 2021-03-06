import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import BackHomeLink from "../components/BackHomeLink";
import Header from "../components/Header";
import Loader from '../components/Loader';

const NewClients = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"

  const { register, handleSubmit, formState: { errors } } = useForm();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);
  
  const onSubmit = data => {

    setIsLoading(true);
    
    const createNewClients = async() => {

          try {
                const response = await axios.post(`/clients/createClient`,
                    JSON.stringify(data),
                    {
                    headers: 
                        {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json, text/plain,'
                        },
                        // withCredentials: true
                    }
                );
                if (response.data.success === -1) {
                    navigate('/login', {state: { from: location }, replace: true })
                }
                if (response.data.success === -2) {
                    navigate('/', {state: { from: location }, replace: true })
                }
                navigate(from, { replace: true })                
                setIsLoading(false);
          } catch (err) {
            
          }
    } ;
  
    createNewClients()
  };

  return (
        <>
        <Header />
        
        <section className="new-clients" style={{marginTop: "60px"}}>

            <div className="new-clients--container">
            <BackHomeLink />
            <form className="new-clients__form" onSubmit={handleSubmit(onSubmit)}>

                <div className="new-clients__form--container">
                <fieldset>
                    <legend>Donn??es clients</legend>

                    <label htmlFor="id">Identifiant <span className="mandatory">*</span></label>
                    <input type="number" id="id"
                    {...register("id", {
                        required: true,
                        maxLength: 20
                    })}
                    />
                    {errors?.id?.type === "required" && <p className="error-message">Ce champ doit ??tre compl??t??</p>}
                    {errors?.id?.type === "maxLength" && (
                    <p className="error-message">Le nombre de caract??res autoris?? est de maximum 20</p>
                    )}

                    <label htmlFor="prenom">Pr??nom <span className="mandatory">*</span></label>
                    <input type="text" id="prenom"
                    {...register("prenom", {
                        required: true,
                        maxLength: 20
                    })}
                    />
                    {errors?.prenom?.type === "required" && <p className="error-message">Ce champ doit ??tre compl??t??</p>}
                    {errors?.prenom?.type === "maxLength" && (
                    <p className="error-message">Le nombre de caract??res autoris?? est de maximum 20</p>
                    )}

                    <label htmlFor="nom">Nom <span className="mandatory">*</span></label>
                    <input type="text" id="nom"
                    {...register("nom", {
                        required: true,
                        maxLength: 20
                    })}
                    />
                    {errors?.nom?.type === "required" && <p className="error-message">Ce champ doit ??tre compl??t??</p>}
                    {errors?.nom?.type === "maxLength" && (
                    <p className="error-message">Le nombre de caract??res autoris?? est de maximum 20</p>
                    )}

                    <label htmlFor="description">Description</label>
                    <textarea id="description"
                    {...register("description")}
                    />

                    <label htmlFor="langue">Langue</label>
                    <input type="lang" id="langue"
                    {...register("langue", {
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i
                    })}
                    />
                    {errors?.langue?.type === "maxLength" && (
                    <p className="error-message">Le nombre de caract??res autoris?? est de maximum 20</p>
                    )}
                    {errors?.langue?.type === "pattern" && (
                    <p className="error-message">Les chiffres ou caract??res sp??ciaux ne sont pas autoris??s</p>
                    )}

                </fieldset>

                <fieldset>
                    <legend>Informations soci??t??s</legend>
                    
                    <label htmlFor="societe">Soci??t??</label>
                    <input type="text" id="societe"
                    {...register("societe", {
                        maxLength: 20
                    })}
                    />
                    {errors?.societe?.type === "maxLength" && (
                    <p className="error-message">Le nombre de caract??res autoris?? est de maximum 20</p>
                    )}

                    <label htmlFor="activite">Activit??</label>
                    <input type="text" id="activite"
                    {...register("activite", {
                        maxLength: 50
                    })}
                    />
                    {errors?.activite?.type === "required" && <p>Ce champ doit ??tre compl??t??</p>}
                    {errors?.activite?.type === "maxLength" && (
                    <p className="error-message">Le nombre de caract??res autoris?? est de maximum 50</p>
                    )}

                    <label htmlFor="site">Site web</label>
                    <input type='url' id="site"
                    {...register("site")}
                    />

                    <label htmlFor="crm">CRM</label>
                    <input type='url' id="crm"
                    {...register("crm")}
                    />

                    <label htmlFor="consignes">Consignes</label>
                    <textarea id="consignes"
                    {...register("consignes")}
                    />

                </fieldset>

                <fieldset>
                    <legend>Adresse et coordonn??es</legend>
                    
                    <label className="adresse" htmlFor="adresse">Adress compl??te</label>
                        <textarea id="adresse"
                        {...register("adresse")}
                        />
                    

                    <label htmlFor="mail">mail <span className="mandatory">*</span></label>
                    <input type='email' id="mail"
                    {...register("mail", {
                        required: true
                    })}
                    />
                    {errors?.mail?.type === "required" && <p className="error-message">Ce champ doit ??tre compl??t??</p>}

                    <label htmlFor="telephone">T??l??phone <span className="mandatory">*</span></label>
                    <input type='number' id="telephone"
                    {...register("telephone", {
                        required: true
                    })}
                    />
                    {errors?.telephone?.type === "required" && <p className="error-message">Ce champ doit ??tre compl??t??</p>}

                </fieldset>
                </div>

                <button className='button-submit'>Valider</button>
            </form>
            </div>

            { isLoading && 
            <div className='containerLoader'>
                <Loader />
            </div>
            }

        </section>   
        </>

  )
}

export default NewClients