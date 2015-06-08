<?php

namespace Ymir\YmirTyrBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PageType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('project')
            /*->add('widgets', 'collection', array(
                'type' => new WidgetType(),
                'by_reference' => false,
                'allow_add' => true,
                'allow_delete' => true
            ))*/
        ;
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Ymir\YmirTyrBundle\Entity\Page',
            'csrf_protection' => false
,        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ymir_ymirtyrbundle_page';
    }
}
