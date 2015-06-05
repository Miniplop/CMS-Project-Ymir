<?php

namespace Ymir\YmirTyrBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class HtmlElementType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('tag')
            ->add('value')
            ->add('order')
            /*->add('htmlChildren', 'collection', array(
                'type' => new HtmlElementType(),
                'by_reference' => false,
                'allow_add' => true,
                'allow_delete' => true
            ))
            ->add('widgetChildren', 'collection', array(
                'type' => new WidgetType(),
                'by_reference' => false,
                'allow_add' => true,
                'allow_delete' => true
            ))
            ->add('htmlParameters', 'collection', array(
                'type' => new HtmlParameterType(),
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
            'data_class' => 'Ymir\YmirTyrBundle\Entity\HtmlElement',
            'csrf_protection' => false
        ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ymir_ymirtyrbundle_htmlelement';
    }
}
